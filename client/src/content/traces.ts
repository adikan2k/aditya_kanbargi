/**
 * OrbitGlass repetition atlas: every saved sentence, by model and temperature.
 *
 * Generated from github.com/adikan2k/orbitglass---inside-language-model-loops,
 * data/sentence_traces.csv (336 sentences). Prompt: "Is the Earth flat?". One saved
 * run per model and temperature (top-k 50, seed 1, 256 new tokens). Letters are
 * sentence clusters within one run (character n-gram TF-IDF, cosine clustering).
 */

export const traceModels = ["GPT-2", "DistilGPT-2"] as const;
export type TraceModel = (typeof traceModels)[number];

export interface Trace {
  /** One letter per sentence: its cluster within the run. */
  clusters: string;
  sentences: string[];
}

export const traceTemperatures = ["0.10", "0.32", "0.50", "0.55", "0.70", "0.78", "1.00"] as const;

export const traces: Record<string, Record<TraceModel, Trace>> = {
  "0.10": {
    "GPT-2": {
      "clusters": "ABABABABABABABABABABABABABABABABA",
      "sentences": [
        "Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer: Yes, it is.",
        "Question: Is the earth flat?",
        "Answer:"
      ]
    },
    "DistilGPT-2": {
      "clusters": "ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
      "sentences": [
        "Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes.",
        "Answer: Yes"
      ]
    }
  },
  "0.32": {
    "GPT-2": {
      "clusters": "ABBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
      "sentences": [
        "Yes, the earth is flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is not flat.",
        "The earth is"
      ]
    },
    "DistilGPT-2": {
      "clusters": "AAAAAAAAAAAAAAAAAAAAAAAA",
      "sentences": [
        "Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but it is not flat.",
        "Answer: Yes, but"
      ]
    }
  },
  "0.50": {
    "GPT-2": {
      "clusters": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB",
      "sentences": [
        "The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer: The earth is flat.",
        "Answer:"
      ]
    },
    "DistilGPT-2": {
      "clusters": "AAAAAAAAAAAAAAAAAAAAAAAA",
      "sentences": [
        "I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it's the earth flat.",
        "Answer: I think it"
      ]
    }
  },
  "0.55": {
    "GPT-2": {
      "clusters": "ABBCBCBCBCBCBC",
      "sentences": [
        "Yes, it is.",
        "The earth is composed of a single part, called the Earth.",
        "The Earth is composed of a portion called the Earth-Terrestrial Division.",
        "The Earth has a radius of about 2.5 kilometers, and the Earth-Terrestrial Division is about 1.5 kilometers.",
        "The Earth is composed of a single part called the Earth-Terrestrial Division.",
        "The Earth has a radius of about 2.5 kilometers, and the Earth-Terrestrial Division is about 1.5 kilometers.",
        "The Earth is composed of a single part called the Earth-Terrestrial Division.",
        "The Earth has a radius of about 2.5 kilometers, and the Earth-Terrestrial Division is about 1.5 kilometers.",
        "The Earth is composed of a single part called the Earth-Terrestrial Division.",
        "The Earth has a radius of about 2.5 kilometers, and the Earth-Terrestrial Division is about 1.5 kilometers.",
        "The Earth is composed of a single part called the Earth-Terrestrial Division.",
        "The Earth has a radius of about 2.5 kilometers, and the Earth-Terrestrial Division is about 1.5 kilometers.",
        "The Earth is composed of a single part called the Earth-Terrestrial Division.",
        "The Earth has a radius of about 2"
      ]
    },
    "DistilGPT-2": {
      "clusters": "ABBABBCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      "sentences": [
        "Yes, it is.",
        "The earth is flat.",
        "It is flat.",
        "Answer: Yes, it is.",
        "The earth is flat.",
        "It is flat.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is.",
        "Answer: No, it is."
      ]
    }
  },
  "0.70": {
    "GPT-2": {
      "clusters": "ABCDDEFGHIIII",
      "sentences": [
        "Yes.",
        "If you look at the top of the Earth, then it is flat.",
        "This is because the earth's surface is composed of two layers.",
        "The bottom layer is the surface layer of the earth, while the upper layer is the surface layer of the earth.",
        "The top layer is the earth's surface, while the bottom layer is the Earth's surface.",
        "It is also known as the \"earth's crust.\"",
        "The crust is composed of layers of rock, which are covered with water.",
        "The water from the water layer is called hydrothermal water, which is a mineral.",
        "For example, water from a deep tank of hydrothermal water is about 4,000 times more powerful than water from a deep tank of water.",
        "The water from the water layer is called the \"sodium chloride\" in the terminology of the International Atomic Energy Agency.",
        "The water from the water layer is called the \"sodium chloride\" in the terminology of the International Atomic Energy Agency.",
        "The water from the water layer is called the \"sodium hydroxide\" in the terminology of the International Atomic Energy Agency.",
        "The water from the water layer is called the \"sodium fluoride\" in the terminology of the International Atomic Energy Agency."
      ]
    },
    "DistilGPT-2": {
      "clusters": "ABCDECDEFFFFFGEHEI",
      "sentences": [
        "Yes.",
        "If you look at the Earth, there is a solid, flat earth.",
        "Is it a flat earth?",
        "What exactly does it mean?",
        "Answer: Yes.",
        "Are it a flat earth?",
        "What exactly does it mean?",
        "Answer: Yes.",
        "In fact, the Earth is flat.",
        "The earth is flat.",
        "The earth is flat.",
        "The Earth is flat.",
        "The Earth is flat.",
        "Can you describe it as a flat earth?",
        "Answer: Yes.",
        "Do you have an idea about the Earth's surface?",
        "Answer: Yes.",
        "On a cold, dry, wet, cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day, or a cold day"
      ]
    }
  },
  "0.78": {
    "GPT-2": {
      "clusters": "ABCDEFGHIJKLM",
      "sentences": [
        "I'm not sure of its flatness but there are some factors that can affect the earth's shape.",
        "One of the many factors for this is the wind speed of the earth, which is measured in miles per hour.",
        "In some places it would be much greater than this.",
        "It is also a good rule to check yourself if your horse or cat is fast enough to reach the edge of the earth.",
        "If you can get a good speed your horse or cat will reach the edge of the earth.",
        "In the case of the polar bear the wind speed is also the same or higher.",
        "So how do you determine if the earth is flat but not flat?",
        "Well, you can have a great deal of confidence that it is not flat either.",
        "The most important thing is that you measure the earth's spin.",
        "If it's flat, your horse will be faster than he or she will be, so you are also going to have a good idea of when the earth is flat or whether or not it's flat.",
        "I would be curious to hear if you have any other problems or problems with your horse or cat.",
        "Posted by Dave on October 27, 2012 at 10:32 AM",
        "I would like to hear about your experiences with horses that have lost their tails in the cold."
      ]
    },
    "DistilGPT-2": {
      "clusters": "AABBBBBBBBBBCBBBC",
      "sentences": [
        "I'm not suggesting that the Earth would be flat.",
        "I'm suggesting that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Question 1: Can we really say that the earth is flat?",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Answer: I'd like to point out that the Earth would be flat.",
        "Question 2: Can we really say that the Earth would be"
      ]
    }
  },
  "1.00": {
    "GPT-2": {
      "clusters": "ABCDEFGHIJK",
      "sentences": [
        "\"According to ancient religion, the earth is also flat.",
        "The most recent work from the New York Academy of Sciences suggests that that's right.",
        "Our planet is filled with the same \"flat\" and not \"flat\" matter.",
        "For example, the Earth's surface is more covered by rain and cooler temperatures than is the outer solar system.",
        "Likewise, the Earth is more covered by wind and solar radiation than is the outer solar system at every latitude and zenith of the Moon or sun.",
        "What do you think about the fact that we haven't thought about this for decades?",
        "What exactly is important is to keep in mind what this means for us because we already do this a number of other ways.",
        "For example, we've seen the moon rise in the past, and our world is undergoing what's called polar expansion.",
        "The Earth has a \"short end\" of the Moon or \"long end\" of the planet, so we expect to see the moon's long end at any given moment, but we also expect the Earth to follow a different course than does our solar system.",
        "We also expect to see the moon rise when far enough out (1-22 degrees to the right), and then to be in our solar system.",
        "The second thing we need attention"
      ]
    },
    "DistilGPT-2": {
      "clusters": "AABCDEFGHIJAK",
      "sentences": [
        "\"Yes, no, none,\" and by definition it is flat.",
        "And by definition it is flat.",
        "Well, I'm not really sure.",
        "Yes, I'm sure.",
        "For every pound and piece of the earth the sun, it's square-climbed, a perfect sphere, and it's square.",
        "All the other parts and things, all the other parts of the earth are so flat.",
        "And by definition the whole matter goes up over time and time, for the sun is not in the same spot as the Earth.",
        "For this reason, I say the whole matter is exactly what is going on.",
        "I mean I'm not sure when I'll use the word a little bit to describe this.",
        "I think we've seen some stuff in our past about it, and now we have what's called the cosmic \"nocturnal\" or nocturnal planets.",
        "My question is is in which one's the number of \"nocturnal\" planets, and should we get that, by all means, the number of \"nocturnal\" planets, or why?",
        "Answer: \"Actually,\" and by definition it is not.",
        "I think there are a number of different people on Earth, for example, in the United States, when my wife,"
      ]
    }
  }
};
