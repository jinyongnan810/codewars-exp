import string
import re

def is_pangram_mine(s):
    # remove other chars
    chars = re.sub(r'[^a-z]','',s,flags=re.IGNORECASE)
    # turn to lowercases
    chars = chars.lower()
    # remove duplicated chars
    no_duplicated = list(dict.fromkeys(chars))
    return len(no_duplicated)==26


def is_pangram_others(s):
    return set(string.ascii_lowercase) <= set(s.lower())