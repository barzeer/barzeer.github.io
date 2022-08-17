"""This program analyzes all the words in a list of five-letter words
and produces groups of four words that have no letters in common. These
groups of words are useful for playing Wordle® because each group tests
20 letters in a Wordle game.

* Wordle is a registered trademark of the New York Times Company.
"""
from extract import ALL_LETTERS_LIST, SECRET_WORDS_LIST

from timeit import default_timer as timer
import math


def main():
    start = timer()
    letter_prob_dict = make_letter_probability_dict(SECRET_WORDS_LIST)
    word_bitset_dict = filter_words(letter_prob_dict, SECRET_WORDS_LIST)

    sorted_groups = get_word_groups(letter_prob_dict, word_bitset_dict)
    print("Best 20 word groups")
    for group in sorted_groups[:20]:
        print(group)
    print()

    elapsed_secs = timer() - start
    print(f"time: {int(round(elapsed_secs))} seconds")


def make_letter_probability_dict(words_list):
    """Create and return a dictionary containing (letter, probability)
    pairs for all the letters in all the words in words_list.
    """
    # Create an empty histogram.
    letter_prob_dict = {}
    for letter in ALL_LETTERS_LIST:
        letter_prob_dict[letter] = 0

    total = 0
    for word in words_list:
        for letter in word:
            count = letter_prob_dict[letter]
            count += 1
            letter_prob_dict[letter] = count
            total += 1

    assert len(words_list) * 5 == total

    # Convert counts to probabilities.
    for letter, count in letter_prob_dict.items():
        probability = count / total
        letter_prob_dict[letter] = probability

    print(f"Letter-probability dictionary: {len(letter_prob_dict):,}")
    print('{', end='')
    sep = ''
    for letter, probability in letter_prob_dict.items():
        print(f"{sep}'{letter}': {probability:.5f}", end='')
        sep = ', '
    print('}')
    print()
    return letter_prob_dict


def make_word_probability_dict(letter_prob_dict, words_list):
    """Create and return a dictionary containing (word, sum of letter
    probability) pairs.
    """
    word_prob_dict = {}
    for word in words_list.keys():
        probability = 0
        for letter in word:
            probability += letter_prob_dict[letter]
        assert probability > 0
        word_prob_dict[word] = probability

    print(f"Word-probability dictionary: {len(word_prob_dict):,}")
    print('{')
    for word, probability in word_prob_dict.items():
        print(f"    '{word}': {probability:.5f},")
    print('}')
    print()
    return word_prob_dict


def filter_words(letter_prob_dict, words_list):
    """Create and return a dictionary of word, bitset pairs. Each word
    will have five distinct letters, and all five letters will be in the
    set of 20 most frequent letters.
    """
    letter_prob_list_by_freq = sorted(letter_prob_dict.items(),
            key=lambda item : item[1], reverse=True)
    most_freq_20_letters = list(dict(letter_prob_list_by_freq[0:20]).keys())
    print("Most frequent 20 letters:")
    print(most_freq_20_letters)
    most_freq_20_letters = "".join(sorted(most_freq_20_letters))
    print(most_freq_20_letters)

    most_freq_bitset = bs32_add_word(0, most_freq_20_letters)
    print(bs32_tostr(most_freq_bitset))
    print()

    word_bitset_dict = {}
    for word in words_list:
        bitset = bs32_add_word(0, word)
        combined = most_freq_bitset & bitset
        if bs32_count(combined) == 5:
            word_bitset_dict[word] = bitset

    print(f"Word-bitset dictionary: {len(word_bitset_dict):,}")
    print('{')
    for word, bitset in word_bitset_dict.items():
        print(f"    '{word}': {bs32_tostr(bitset)[6:]},")
    print('}')
    print()
    return word_bitset_dict


def get_word_groups(letter_prob_dict, word_bitset_dict):
    """Find all groups of four words that have no letters in common.
    Return all the groups in a list.
    """
    groups_list = []
    items = list(word_bitset_dict.items())
    length = len(items)
    ncombs = number_combinations(length, 4)
    print(f"Number of combinations: {ncombs:,}")

    start = lap_start = timer()
    per_lap = 200
    g = per_lap
    laps = 0

    for zero in range(0, length):
        word0, bitset0 = items[zero]
        for one in range(zero + 1, length):
            word1, bitset1 = items[one]
            bitset = bitset0 & bitset1
            if bitset == 0:
                for two in range(one + 1, length):
                    word2, bitset2 = items[two]
                    bitset = (bitset0 & bitset2) | (bitset1 & bitset2)
                    if bitset == 0:
                        for three in range(two + 1, length):
                            word3, bitset3 = items[three]
                            bitset = (bitset0 & bitset3) \
                                    | (bitset1 & bitset3) \
                                    | (bitset2 & bitset3)
                            if bitset == 0:
                                group = (word0, word1, word2, word3)
                                groups_list.append(group)
                                g -= 1
                                if g == 0:
                                    g = per_lap
                                    laps += 1
                                    found = laps * per_lap
                                    end = timer()
                                    elapsed = end - lap_start
                                    lap_start = end
                                    print(f"{found:,}: {int(round(elapsed)):,}",
                                            group, flush=True)

    elapsed_secs = timer() - start
    print(f"time: {int(round(elapsed_secs))} seconds")
    print()

    # groups_list contains four-word-tuples. The four words in each
    # tuple contain no repeated letters and contain only the 20 most
    # frequently occurring letters.

    word_prob_dict = make_word_probability_dict(
            letter_prob_dict, word_bitset_dict)

    def get_word_probability(word):
        return word_prob_dict[word]

    def get_word_group_probabilities(word_group):
        word0, word1, word2, word3 = word_group
        return (word_prob_dict[word0],
                word_prob_dict[word1],
                word_prob_dict[word2],
                word_prob_dict[word3])

    # Sort the four words in each four-word-tuple so that the word with
    # the highest probability letters is first and the word with the
    # lowest probability letters is last.
    for i in range(len(groups_list)):
        word_group = groups_list[i]
        assert len(word_group) == 4
        word_group = tuple(sorted(word_group,
                key=get_word_probability, reverse=True))
        assert len(word_group) == 4
        groups_list[i] = word_group

    # Sort the groups_list so that the group with highest probability in
    # the first words appears first in the list.
    sorted_groups = sorted(groups_list,
            key=get_word_group_probabilities, reverse=True)
    print(f"Sorted word groups: {len(sorted_groups):,}")
    for group in sorted_groups:
        print(group)
    print()
    return sorted_groups


def number_combinations(n, r):
    num_combs = math.factorial(n) / (math.factorial(r) * math.factorial(n-r))
    return int(num_combs)


_LETTER_BITS = [
    0x2000000, 0x1000000,  # a - b
    0x800000, 0x400000, 0x200000, 0x100000,  # c - f
    0x80000, 0x40000, 0x20000, 0x10000,  # g - j
    0x8000, 0x4000, 0x2000, 0x1000,  # k - n
    0x800, 0x400, 0x200, 0x100,  # o - r
    0x80, 0x40, 0x20, 0x10,  # s - v
    0x8, 0x4, 0x2, 0x1  # w - z
]

def bs32_add_word(bitset, word):
    """Add one bits (1) for the letters of a word to an existing bitset.
    """
    assert isinstance(bitset, int)
    assert bitset & 0xffffffff == bitset
    assert isinstance(word, str)
    assert word.islower() or word == ""
    ord_a = 97  # ord("a")
    for letter in word:
        index = ord(letter) - ord_a
        bitset |= _LETTER_BITS[index]
    return bitset

def bs32_count(bitset):
    """Count and return the number of one bits (1) in bitset.
    """
    assert isinstance(bitset, int)
    assert bitset & 0xffffffff == bitset
    ones  = 0x55555555
    twos  = 0x33333333
    fours = 0x0f0f0f0f
    bitset = ((bitset >> 1) & ones) + (bitset & ones)
    bitset = ((bitset >> 2) & twos) + (bitset & twos)
    bitset = ((bitset >> 4) + bitset) & fours
    bitset = ((bitset >> 8) + bitset)
    bitset = ((bitset >> 16) + bitset)
    return bitset & 0xff

def bs32_tostr(bitset):
    """Convert a bitset to a string. This is useful for debugging.
    """
    assert isinstance(bitset, int)
    assert bitset & 0xffffffff == bitset
    s = ""
    mask = 0x80000000
    for i in range(32):
        s += "0" if bitset & mask == 0 else "1"
        mask >>= 1
    return s


# Call main to start this program.
if __name__ == "__main__":
    main()
