import json
import re
import nltk
from collections import Counter

'''
Function `makeFreq`

Given an list of words (variable: `words`), returns a
frequency table of the most common 30 words.  The returned
result is a dictionary with up to 30 keys, where each key is
a word from `words` and each value is the occurance frequency.

Example Input:
  `words` = ["a", "cat", "and", "a", "mouse"]

Example Output:
  { "a": 2, "cat": 1, "and": 1, "mouse": 1 }
'''
def makeFreq(words):
    freq = Counter()

    for w in words:
        freq[w] += 1
    freq_table = dict(freq.most_common(30))
    return freq_table


outData = []
def addToOutput(title, words):
    print("Adding `" + title + "` to output...")
    freq = makeFreq(words)

    freqDict = {
        'title': title,
        'freq': freq
    }
    outData.append(freqDict)


def cleanText_HungerGames(text):
    match = r'\d+ \| P a g e\w*'
    text = re.sub(match, '', text)
    match = r'The Hunger Games - Suzanne Collins\w*'
    text = re.sub(match, '', text)

    text = re.sub('\n\n+', '--MARKER--', text)
    text = re.sub('\n', ' ', text)
    text = re.sub('--MARKER--', '\n\n', text)

    return text

#def getParagraphs(text):
#    from nltk.tokenize import TextTilingTokenizer
#    return TextTilingTokenizer().tokenize(text)

def prcoessText(text):
    from nltk.tokenize import word_tokenize
    words = word_tokenize(text)
    addToOutput("Tokenized Words", words)

    words = [w.lower() for w in words]
    addToOutput("Lowercase Words", words)

    words = [w for w in words if w.isalpha()]
    addToOutput("Alpha words only", words)

    from nltk.corpus import stopwords
    words = [w for w in words if not w in stopwords.words('english')]
    addToOutput("Removing stopwords", words)

    from nltk.stem.snowball import SnowballStemmer
    words = [SnowballStemmer('english').stem(w) for w in words]
    addToOutput("Stem", words)

    return words




# Open the text, read the entire file
textFile = 'res/hg.txt'
textRaw = open(textFile).read()

text = cleanText_HungerGames(textRaw)
words = prcoessText(text)



# Output
with open("res/freq.json", "w") as f:
    json.dump(outData, f, indent = 2)
