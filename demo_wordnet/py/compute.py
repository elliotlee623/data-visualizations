import json
import re
#import nltk
from nltk.tokenize import word_tokenize
from nltk.tokenize import TextTilingTokenizer
from nltk.corpus import stopwords
from nltk.corpus import wordnet as wn
from collections import defaultdict

import nltk

def makeLemmaNamesList(qw):
	#assemble list of lemma_names for each synset of queryWord
    ss = wn.synsets(qw)
    lemmaNamesList = [ r.lemma_names() for r in ss]
    return lemmaNamesList

def makeSynsetParaList(wordLemmas,paraWords):
    synsetParaList = []
    for l in wordLemmas:
        d = defaultdict(list)
        for w in l:
            for k,p in enumerate(paraWords):
                if w in p:
                    d[w].append(k)
        synsetParaList.append(d)
    return synsetParaList

def clean(words):
    words = [w.lower() for w in words]
    words = [re.sub('\.$', '',w) for w in words]
    words = [w for w in words if w.isalpha()]
    words = [w for w in words if not w in stopwords.words('english')]
    #words = [SnowballStemmer('english').stem(w) for w in words]
    return words

def customPreprocessing(textRaw):
    #custom preprocessing on raw string.
    match = r'\d+ \| P a g e'
    textRaw = re.sub(match,'',textRaw)
    match = r'The Hunger Games - Suzanne Collins'
    textRaw = re.sub(match,'',textRaw)
    match = r'\n\n\n\n'
    textRaw = re.sub(match,'',textRaw)
    return textRaw

textFile = 'res/hg-short.txt'
textRaw = open(textFile, 'r', encoding='utf-8').read() #textRaw is now a string

textRaw = customPreprocessing(textRaw)

#tokenize the text into paragraphs (takes a long time).
ttt = TextTilingTokenizer()
paragraphs = ttt.tokenize(textRaw)
#write it out for use in the viz
f = open("res/paragraphs.json",'w')
s = json.dumps(paragraphs, indent = 4)
f.write(s)

#set up initial word tokens for each paragraph
paraWords = [word_tokenize(p) for p in paragraphs]
#clean each paragraph
paraWords = [clean(p) for p in paraWords]

queryWordList = ['battle','fight']
outData = defaultdict()
for word in queryWordList:
    #create the list of synonyms for each sense of the word
    wordLemmas = makeLemmaNamesList(word)

    #assemble list of paragraphs for every synonym in each synset
    wordParaList = makeSynsetParaList(wordLemmas,paraWords)

    outData[word] = wordParaList

with open("res/data.json", 'w') as f:
    s = json.dumps(outData, indent = 4)
    f.write(s)
