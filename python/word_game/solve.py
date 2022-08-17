"""This program is a Wordle® solver. Given the results of one or more
Wordle guesses, this program prints a list of words that match the
results.

How to use this program.
1. Run this program
2. Begin playing Wordle.
3. After entering one or more guesses in Wordle, enter the results of
   those guesses in this program.
4. This program will print a list of words that fit the results of your
   guesses.

This program contains a known problem. If the user enters the result of
a guess that contains two of the same letter, this program will include
words that contain only one instance of that letter in its output. For
example:
1. A user plays Wordle and enters the guess "alarm".
2. Wordle responds with the result "ALa.."
3. The user enters "Ala.." (first result) and "mr" (letters not in the
word).
4. This program will respond with these words:
   algae
   alibi
   ...
Notice that "alibi" is in the list but cannot be the secret word because
it doesn't have two a's.

* Wordle is a registered trademark of the New York Times Company.
"""
from extract import ALL_LETTERS_SET, SECRET_WORDS_SET
import re


def main():
    clues = get_clues()

    print()
    letters = input("Enter letters that you know are not in the word: ")
    letters_not_in_word = set(keep_alpha(letters).lower())

    regex = make_regex(clues, letters_not_in_word)
    known_letters = consolidate_known_letters(clues)

    # print()
    # print("Letters in the word:", make_sorted_str(known_letters))
    # print("Letters not in the word:", make_sorted_str(letters_not_in_word))
    # print("Pattern:", regex.pattern)

    # Find all the words that match the regular expression and that
    # contain all the known letters.
    print()
    for word in sorted(SECRET_WORDS_SET):
        if regex.fullmatch(word) and \
            all(letter in word for letter in known_letters):
                print(word)


def get_clues():
    print("Enter the results of your Wordle guesses. For each result,",
        "enter five characters. Each character must be an uppercase",
        "or lowercase English letter or a period. The meaning of the",
        "characters is the following:",
        "1. An uppercase letter means that letter is in the secret",
        "   word and in the correct position.",
        "2. A lowercase letters means that letter is in the secret",
        "   word but in the wrong position.",
        "3. A period (.) means it is uncertain what letter belongs",
        "   in that position.",
        "For example: .aM..",
        "",
        "In order to stop entering results, enter a blank result or",
        "in other words, simply press Enter.",
        "", sep="\n")
    clues = []
    ordinals = ["first", "second", "third", "fourth", "fifth"]
    for ordinal in ordinals:
        clue = get_clue(ordinal)
        if len(clue) == 0:
            break
        clues.append(clue)
    return clues


def get_clue(ordinal):
    """Get the results of one Wordle guess (a clue) from the user.
    """
    clue = None
    while True:
        clue = input(f"Enter the result of your {ordinal} guess: ")
        valid = keep_alpha_dot(clue)
        length = len(clue)
        if clue == valid and (length == 0 or length == 5):
            break
        else:
            print("    Error: invalid guess result.")
            print("    Please enter five characters. Each character must be")
            print("    an uppercase or lowercase English letter or a period.")
            print("    For example: .aM..")
    return clue


NON_ALPHABET_REGEX = re.compile(r"[^A-Za-z]+")
NON_ALPHA_DOT_REGEX = re.compile(r"[^A-Za-z.]+")

def keep_alpha(string):
    """Given a string, return a new string that contains only letters
    from the English alphabet.
    """
    return NON_ALPHABET_REGEX.sub("", string)


def keep_alpha_dot(string):
    """Given a string, return a new string that contains only letters
    from the English alphabet and the period symbol.
    """
    return NON_ALPHA_DOT_REGEX.sub("", string)


def make_regex(clues, letters_not_in_word):
    """Create and return a regular expression that this program will use
    to search the list of all words.
    """
    possible_letters = ALL_LETTERS_SET - letters_not_in_word

    pattern = list("." * 5)
    for clue in clues:
        for i, letter in enumerate(clue):
            if letter.isupper():
                pattern[i] = letter.lower()

    for i in range(len(pattern)):
        if pattern[i] == ".":
            char_class = possible_letters.copy()
            for clue in clues:
                letter = clue[i]
                if letter.islower():
                    char_class.remove(letter)
            char_class = make_sorted_str(char_class)
            pattern[i] = f"[{char_class}]"

    return re.compile("^" + "".join(pattern) + "$")


def make_sorted_str(letters_set):
    """Given a set of letters, return a string that contains the letters
    in sorted order.
    """
    return "".join(sorted(letters_set))


def consolidate_known_letters(clues):
    """Create and return a set that contains all the letters known to be
    in the word because of the clues.
    """
    known_letters = set()
    for clue in clues:
        for letter in clue:
            if letter != ".":
                known_letters.add(letter.lower())
    return known_letters


# Call main to start this program.
if __name__ == "__main__":
    main()
