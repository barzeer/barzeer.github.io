"""This pytest program tests the other programs in this folder.
"""
from extract import ALL_LETTERS_LIST, ALL_LETTERS_SET, \
    SECRET_WORDS_SET, _PLURALS_AND_THIRD_PERSON_SET, _PAST_TENSE_SET, \
    _PREFIXES_AND_SUFFIXES_SET, _DATED_SPELLINGS_SET, _LOCATIONS_SET, \
    _NAMES_SET, _FOREIGN_WORDS_SET, _ACRONYMS_SET, _ROMAN_NUMERALS_SET, \
    _OTHER_WORDS_SET, ALLOWED_WORDS_SET, _KNOWN_WORDS_SET
from analyze import _LETTER_BITS, bs32_add_word, bs32_count, bs32_tostr
from play import check_word
from solve import keep_alpha, keep_alpha_dot, \
    make_sorted_str, consolidate_known_letters

import pytest


def test_all_letters():
    """ Verify three things about the ALL_LETTERS list and set:
    1. They each contain 26 letters
    2. Each letter is from the English alphabet
    3. Each letter is unique
    """
    assert isinstance(ALL_LETTERS_LIST, list)
    assert isinstance(ALL_LETTERS_SET, set)
    assert len(ALL_LETTERS_LIST) == 26
    assert len(ALL_LETTERS_SET) == 26
    for letter1, letter2 in \
            zip(sorted(ALL_LETTERS_LIST), sorted(ALL_LETTERS_SET)):
        assert letter1 == letter2
        assert letter1.isalpha() and letter1.isascii()


def test_all_words():
    """Verify two things about the sets of words:
    1. Each word is five letters long
    2. No words are repeated.
    """
    # Verify that all words are five letters long.
    for word in sorted(_KNOWN_WORDS_SET):
        assert len(word) == 5, \
            "All words should be five letters long." \
            f" {word} is {len(word)} letters long."

    sets_list = [
        SECRET_WORDS_SET, _PLURALS_AND_THIRD_PERSON_SET, _PAST_TENSE_SET,
        _PREFIXES_AND_SUFFIXES_SET, _DATED_SPELLINGS_SET, _LOCATIONS_SET,
        _NAMES_SET, _FOREIGN_WORDS_SET, _ACRONYMS_SET, _ROMAN_NUMERALS_SET,
        _OTHER_WORDS_SET
    ]

    # Compute the number of words in all sets.
    num_words = sum(len(word_set) for word_set in sets_list)

    # Verify that no words are repeated in the _KNOWN_WORDS_SET.
    if num_words != len(_KNOWN_WORDS_SET):
        known_words_list = []
        for word_set in sets_list:
            known_words_list.extend(word_set)
        previous = ""
        for word in sorted(known_words_list):
            assert previous < word
            previous = word


def test_letter_bits():
    previous = 0x1_00000000
    bitset = 0
    for mask in _LETTER_BITS:
        assert bs32_count(mask) == 1
        assert mask < previous
        previous = mask
        bitset ^= mask
    assert bitset == 0x03ffffff


def test_bs32_add_word():
    cases = [
        ("a", 1), ("xy", 2), ("xyz", 3), ("wxyz", 4),
        ("bb", 1), ("ccc", 1), ("dddd", 1), ("eeeee", 1),
        ("feast", 5), ("hello", 4), ("puppy", 3)
    ]
    for word, count in cases:
        assert bs32_count(bs32_add_word(0, word)) == count

    cases = [
        (("clump", "blimp", "edify", "slump"), 12),
        (("crown", "shift", "debug", "amply"), 20)
    ]
    for group, count in cases:
        bitset = 0
        for word in group:
            bitset = bs32_add_word(bitset, word)
        assert bs32_count(bitset) == count


def test_bs32_count():
    cases = [
        (0x0, 1, 0),
        (0x1, 32, 1),
        (0x3, 31, 2),
        (0x5, 30, 2), (0x6, 30, 2),
        (0x9, 29, 2), (0xa, 29, 2), (0xc, 29, 2),
        (0x7, 30, 3),
        (0xb, 29, 3), (0xd, 29, 3), (0xe, 29, 3),
        (0xf, 29, 4),
        (0x13, 28, 3),
        (0xf0e, 21, 7),
        (0xffffffff, 1, 32)
    ]
    for pattern, shifts, count in cases:
        for i in range(shifts):
            bitset = pattern << i
            assert bs32_count(bitset) == count


def test_bs32_tostr():
    cases = [
        (0x0, "00000000000000000000000000000000"),
        (0x1, "00000000000000000000000000000001"),
        (0x80000000, "10000000000000000000000000000000"),
        (0x01234567, "00000001001000110100010101100111"),
        (0x89abcdef, "10001001101010111100110111101111")
    ]
    for bitset, expected in cases:
        assert bs32_tostr(bitset) == expected


def test_check_word():
    """ Verify that the check_word function works correctly. """
    cases = [
        # secret, guess, is_correct, expected
        ("speak", "state", False, "S_a_e"),
        ("civil", "audit", False, "___I_"),
        ("civil", "drill", False, "__i_L"),
        ("audit", "civil", False, "___I_"),
        ("drill", "civil", False, "_i__L"),
        ("boost", "booth", False, "BOOt_"),
        ("algae", "alarm", False, "ALa__"),
        ("brave", "brave", True, "BRAVE")
    ]

    len_all_letters = len(ALL_LETTERS_LIST)
    for secret, guess, is_correct, expected in cases:
        guess = list(guess)
        letters = ALL_LETTERS_LIST.copy()
        assert check_word(guess, letters, list(secret)) == is_correct
        assert len(guess) == 5
        if is_correct:
            assert len(letters) == len_all_letters
        else:
            assert len(letters) < len_all_letters
        assert "".join(guess) == expected


def test_keep_alpha():
    cases = [
        ("abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz"),
        (" a b ", "ab"),
        (r"~!@#$%^&*()_+`1234567890-={}|[]\:" + '"' + ";'<>?,./", ""),
        ("", "")
    ]
    for text, expected in cases:
        assert keep_alpha(text) == expected


def test_keep_alpha_dot():
    cases = [
        ("abcdefghijklmnopqrstuvwxyz.", "abcdefghijklmnopqrstuvwxyz."),
        (" a . ", "a."),
        (r"~!@#$%^&*()_+`1234567890-={}|[]\:" + '"' + ";'<>?,./", "."),
        ("", "")
    ]
    for text, expected in cases:
        assert keep_alpha_dot(text) == expected


def test_make_sorted_str():
    cases = [
        (set("axion"), "ainox"),
        (set(), "")
    ]
    for letter_set, expected in cases:
        assert make_sorted_str(letter_set) == expected


def test_consolidate_known_letters():
    cases = [
        ([".ab.n"], set("abn")),
        (["nojab"], set("banjo")),
        (["BAjon"], set("banjo")),
        ([".Ab.n", "jo..."], set("banjo")),
        (["e.t..", ".E.r."], set("ert")),
        (["....."], set()),
        ([""], set())
    ]
    for clues, expected in cases:
        assert consolidate_known_letters(clues) == expected


pytest.main(["-v", "--tb=line", "-rN", __file__])
