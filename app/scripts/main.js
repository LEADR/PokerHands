var Suit,
    Rank,
    Card,
    deck,
    reset;

Suit = {
    "clubs": 1,
    "diamonds": 2,
    "hearts": 3,
    "spades": 4
};
Rank = {
    "ace": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,
    "jack": 11,
    "queen": 12,
    "king": 13
};

Card = function(suit, rank) {
    this.suit = suit;
    this.rank = rank;
};

deck = (function() {
    var cards = [];

    return {

        addCard: function(card) {
            if (!(card instanceof Card)) {
                throw new RangeError("Can only add a Card to the deck");
            }
            cards.push(card);
        },

        buildDeck: function() {
            var suit,
                rank,
                card;

                cards = [];

            for (suit = Suit.clubs; suit <= Suit.spades; suit++) {
                for (rank = Rank.ace; rank <= Rank.king; rank++) {
                    card = new Card(suit, rank);
                    deck.addCard(card);
                }
            }
            console.log(cards);
            console.log("Deck built.");
        },

        shuffle: function(numTimes) {
            if (typeof numTimes !== "number") {
                numTimes = 5;
            }

            var cardCount = cards.length,
                time,
                index,
                temp,
                numToSwap;

            for (time = 0; time < numTimes; time++) {
                for (index = 0; index < cardCount; index++) {
                    numToSwap = (Math.floor(Math.random() * 52));
                    temp = cards[ numToSwap ];
                    cards[ numToSwap ] = cards[ index ];
                    cards[ index ] = temp;
                }
            }
            return ("Deck shuffled " + numTimes + " times.");
        },

        dealCard: function() {
            if (cards.length === 0) {
                throw new RangeError("No cards to deal.");
            }
            cards.pop();
        },

        dealUserHand: function(numCards) {
            var hand = [],
                temp,
                index,
                list,
                containsNTimes,
                highest,
                lowest,
                handRanks,
                acesHigh,
                handSuits,
                highCard,
                lowCard,
                pairs,
                twoPair,
                threeOfAKind,
                straight,
                flush,
                fullHouse,
                fourOfAKind,
                straightFlush,
                royalFlush,
                rankI,
                suitI;

            if (cards.length < numCards) {
                reset();
            }

            if (typeof numCards !== "number") {
                throw new RangeError("Please specify number of cards in a hand.");
            } else if (numCards >= 52) {
                throw new RangeError("The whole deck is not a hand...");
            } else if (cards.length < numCards) {
                console.log("Not enough cards. Resetting deck...");
                reset();
            }

            $("body").empty();

            for (index = 0; index < numCards; index++) {
                temp = cards.pop();
                hand.push(temp);

                list = $("<ul>");
                $("<li>").text(temp.rank + " , " + temp.suit).appendTo(list);
                $("body").append(list);
            }
            console.log(cards.length);

            containsNTimes = function(arr, string, times) {
                var counter = 0,
                    result = false;

                arr.forEach(function(val) {
                    if (val === string) {
                        counter++;
                    }
                });

                if (counter === times) {
                    result = true;
                }
                return result;
            };

            highest = function(arr) {
                var result = 1;

                arr.forEach(function(val) {
                    if (val.rank >= result) {
                        result = val.rank;
                    }
                });
                return result;
            };

            lowest = function(arr) {
                var result = 14;

                arr.forEach(function(val) {
                    if (val.rank <= result) {
                        result = val.rank;
                    }
                });
                return result;
            };

            handRanks = hand.map(function(card) {
                return card.rank;
            });

            acesHigh = hand.map(function(card) {
                if (card.rank === 1) {
                    card.rank = 14;
                }
                return card;
            });

            handSuits = hand.map(function(card) {
                return card.suit;
            });

            highCard = highest(hand);
            lowCard = lowest(hand);
            pairs = 0;
            twoPair = false;
            threeOfAKind = false;
            straight = false;
            flush = false;
            fullHouse = false;
            fourOfAKind = false;
            straightFlush = false;
            royalFlush = false;

            // Pair, Three of a Kind, Four of a Kind
            for (rankI in Rank) {
                if (containsNTimes(handRanks, Rank[ rankI ], 2)) {
                    pairs++;
                }
                if (containsNTimes(handRanks, Rank[ rankI ], 3)) {
                    threeOfAKind = true;
                }
                if (containsNTimes(handRanks, Rank[ rankI ], 4)) {
                    fourOfAKind = true;
                }
            }

            // Two Pair
            if (pairs === 2) {
                twoPair = true;
            }

            // Straight
            if (!(pairs) && !(threeOfAKind) && !(fourOfAKind)) {
                if (highCard - lowCard === 4) {
                    straight = true;
                }
                highCard = highest(acesHigh);
                lowCard = lowest(acesHigh);
                if (highCard - lowCard === 4) {
                    straight = true;
                }
            }

            // Flush
            for (suitI in Suit) {
                if (containsNTimes(handSuits, Suit[ suitI ], 5)) {
                    flush = true;
                }
            }

            // Full House
            if (pairs && threeOfAKind) {
                fullHouse = true;
            }

            // Straight Flush
            if (straight && flush) {
                straightFlush = true;
            }

            // Royal Flush
            if (straightFlush && (lowCard === 10 && highCard === 4)) {
                royalFlush = true;
            }

            console.log(hand);
            console.log("High card: " + highCard);
            console.log("Low card: " + lowCard);

            if (royalFlush) {
                console.log("Royal Flush!");
            } else if (straightFlush) {
                console.log("Straight Flush");
            } else if (fourOfAKind) {
                console.log("Four of a Kind");
            } else if (fullHouse) {
                console.log("Full House");
            } else if (flush) {
                console.log("Flush");
            } else if (straight) {
                console.log("Straight");
            } else if (threeOfAKind) {
                console.log("Three of a Kind");
            } else if (twoPair) {
                console.log("Two Pair");
            } else if (pairs) {
                console.log("Pair");
            } else {
                console.log("Fold :(");
            }

        }
    };
})();

$(document).ready(function() {
    var hand1;
    deck.buildDeck();
    deck.shuffle(50);
    hand1 = deck.dealUserHand(5);
});

reset = function() {
    deck.buildDeck();
    deck.shuffle(50);
    console.log("Deck reset.");
};
