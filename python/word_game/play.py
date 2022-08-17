"""This program is a clone of the game named Wordle®.

* Wordle is a registered trademark of the New York Times Company.
"""
from extract import ALL_LETTERS_LIST, SECRET_WORDS_LIST, ALLOWED_WORDS_SET
import random


def main():
    print("",
    "This program is a word guessing game. The computer will choose",
    "a five letter word, and you try to guess it. After each guess,",
    "the computer will print a pattern to show you how close your",
    "guess is to the secret word. Within the pattern, the meaning",
    "of the letters is the following:",
    "1. An uppercase letter means that letter is in the secret word",
    "   and in the correct position.",
    "2. A lowercase letter means that letter is in the secret word",
    "   but in the wrong position.",
    "3. An underscore means that letter is not in the secret word.",
    "",
    "For example,",
    'if the secret word is "laugh",',
    'and you guess "haste",',
    'the computer will print "h A _ _ _"',
    "which means",
    '"h" is in the secret word but in the wrong position,',
    '"a" is in the secret word and in the correct position,',
    '"s", "t", and "e" are not in the secret word.',
    "",
    "After six guesses, if you haven't correctly guessed the secret",
    "word, the computer will show you the word.", sep="\n")

    while True:
        play_once()
        print("Play again!")


def play_once():
    """ Play the five letter word guessing game one time.
    Parameters: none
    Return: nothing
    """
    guess = list("_____")
    letters = ALL_LETTERS_LIST.copy()

    # Choose a word that the player must guess.
    secret = list(random.choice(SECRET_WORDS_LIST))

    # Give the player six guesses, numbered 1 - 6.
    for i in range(1, 7):
        print()
        print(f'{" ".join(guess)}  |  {" ".join(letters)}')
        print()

        # Get a guess from the player.
        guess = input(f"Guess #{i}: ").lower()
        while guess not in ALLOWED_WORDS_SET:
            print("not in word list")
            guess = input(f"Guess #{i}: ").lower()
        guess = list(guess)

        # Check the player's guess.
        is_correct = check_word(guess, letters, secret)
        if is_correct:
            break

    # Print results for the user to see.
    print()
    if is_correct:
        result = "Congratuations!"
    else:
        result = "Incorrect."
    print(f'{result} The secret word was "{"".join(secret)}".')


def check_word(guess, letters, secret):
    """ Determine if the player's guess is correct or not. Also,
    replace the guess with a pattern that shows which characters
    the player guessed correctly. Finally, remove letters that
    the player guessed incorrectly from the list of letters.

    Parameters
        guess: a list of the letters that the player guessed.
        letters: a list of letters that are either correct
            or not yet guessed.
        secret: the word that the player is trying to guess.
    Return
        guess: a pattern that shows which characters the
            player guessed correctly.
        letters: a list of letters that are either correct
            or not yet guessed.
    """
    secret = secret.copy()
    is_correct = True

    # Find correct letters that are in the correct position.
    for i in range(len(secret)):
        g = guess[i]
        s = secret[i]
        if g == s:
            guess[i] = g.upper()
            secret[i] = " "
        else:
            is_correct = False

    # Find correct letters in incorrect positions.
    # Also, find and mark incorrect letters.
    for i in range(len(secret)):
        g = guess[i]
        if g.islower():
            if g in secret:
                index = secret.index(g)
                secret[index] = " "
            else:
                guess[i] = "_"
                if g in letters:
                    letters.remove(g)

    return is_correct


# Call main to start this program.
if __name__ == "__main__":
    main()
