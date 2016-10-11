from nltk.corpus import wordnet as wn

syns = wn.synsets("orange")
print(" == synnet ==")
for syn in syns:
    print(syn)
    print(syn.definition())
    print()
print()


print(" == hypernyms ==")
for syn in syns:
    print(syn)
    for hyper in syn.hypernyms():
        print(hyper)
        print(hyper.definition())
        print()
    print()
print()

print(" == hyponyms ==")
for syn in syns:
    print(syn)
    for hypo in syn.hyponyms():
        print(hypo)
        print(hypo.definition())
        print()
    print()
print()



print(" == lowest common hypernyms ==")
wnDog = wn.synset('dog.n.01')
wnCat = wn.synset('cat.n.01')
print(wnDog.lowest_common_hypernyms(wnCat))
