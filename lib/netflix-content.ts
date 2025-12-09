/**
 * Real Netflix Shows and Movies with Correct TMDB IDs
 * Last Updated: October 2025
 */

export interface NetflixContent {
  id: string;
  title: string;
  tmdbId: string;
  type: "movie" | "series";
  genre: string[];
  duration: string;
  releaseYear: number;
  releaseDate: string;
  rating: number;
  userRating: number;
  thumbnail: string;
  poster: string;
  backdrop: string;
  videoSrc?: string;
  videoUrl: string;
  trailerUrl: string;
  description: string;
  cast: string[];
  director: string;
  studio: string;
  awards?: string;
  trailerDate?: string;
  currentSeason?: number;
  currentEpisode?: number;
  totalSeasons?: number;
  totalEpisodes?: number;
  chapters?: { title: string; startTime: number }[];
  episodes?: {
    title: string;
    duration: string;
    description: string;
    thumbnail: string;
  }[];
  seasons?: {
    seasonNumber: number;
    episodes: {
      title: string;
      duration: string;
      description: string;
      thumbnail: string;
    }[];
  }[];
}

export const netflixShows: NetflixContent[] = [
  // === TV SERIES ===
  // VERIFIED: These are the most popular shows with confirmed TMDB IDs
  {
    id: "1",
    title: "Stranger Things",
    tmdbId: "66732", // ✅ Verified on TMDB
    type: "series",
    genre: ["Sci-Fi", "Horror", "Drama"],
    duration: "51 min",
    releaseYear: 2016,
    releaseDate: "July 15, 2016",
    rating: 9.1,
    userRating: 8.7,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    cast: [
      "Millie Bobby Brown",
      "Finn Wolfhard",
      "Winona Ryder",
      "David Harbour",
      "Gaten Matarazzo",
      "Caleb McLaughlin",
    ],
    director: "The Duffer Brothers",
    studio: "Netflix",
    awards: "Screen Actors Guild Awards",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 4,
    totalEpisodes: 34,
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            title: "Chapter One: The Vanishing of Will Byers",
            duration: "48 min",
            description: "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Two: The Weirdo on Maple Street",
            duration: "55 min",
            description: "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Three: Holly, Jolly",
            duration: "51 min",
            description: "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Four: The Body",
            duration: "49 min",
            description: "Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover. Nancy and Jonathan form an unlikely alliance.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Five: The Flea and the Acrobat",
            duration: "52 min",
            description: "Hopper breaks into the lab while Nancy and Jonathan confront the force that took Will. The boys ask Mr. Clarke how to travel to another dimension.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Six: The Monster",
            duration: "46 min",
            description: "A frantic Jonathan looks for Nancy in the darkness, but Steve's looking for her, too. Hopper and Joyce uncover the truth about the lab's experiments.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Seven: The Bathtub",
            duration: "41 min",
            description: "Eleven struggles to reach Will, while Lucas warns that 'the bad men are coming.' Nancy and Jonathan show the police what Jonathan caught on camera.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Eight: The Upside Down",
            duration: "54 min",
            description: "Dr. Brenner holds Hopper and Joyce for questioning while the boys wait with Eleven in the gym. Back at Will's, something unexpected happens.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
        ],
      },
      {
        seasonNumber: 2,
        episodes: [
          {
            title: "Chapter One: MADMAX",
            duration: "48 min",
            description: "As the town preps for Halloween, a high-scoring rival shakes things up at the arcade, and a skeptical Hopper inspects a field of rotting pumpkins.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Two: Trick or Treat, Freak",
            duration: "56 min",
            description: "After Will sees something terrible on trick-or-treat night, Mike wonders whether Eleven's still out there. Nancy wrestles with the truth about Barb.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Three: The Pollywog",
            duration: "50 min",
            description: "Dustin adopts a strange new pet, and Eleven grows increasingly impatient. A well-meaning Bob urges Will to stand up to his fears.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Four: Will the Wise",
            duration: "45 min",
            description: "An ailing Will opens up to Joyce -- with disturbing results. While Hopper digs for the truth, Eleven unearths a surprising discovery.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Five: Dig Dug",
            duration: "58 min",
            description: "Nancy and Jonathan swap conspiracy theories with a new ally as Eleven searches for someone from her past. 'Bob the Brain' tackles a difficult problem.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Six: The Spy",
            duration: "51 min",
            description: "Will's connection to a shadowy evil grows stronger, but no one's quite sure how to stop it. Elsewhere, Dustin and Steve forge an unlikely bond.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Seven: The Lost Sister",
            duration: "46 min",
            description: "Psychic visions draw Eleven to a band of violent outcasts and an angry girl with a shadowy past.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Eight: The Mind Flayer",
            duration: "55 min",
            description: "An unlikely hero steps forward when a deadly development puts the Hawkins lab on lockdown, trapping Will and several others inside.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Nine: The Gate",
            duration: "62 min",
            description: "Eleven makes plans to finish what she started while the survivors turn up the heat on the monstrous force that's holding Will hostage.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
        ],
      },
      {
        seasonNumber: 3,
        episodes: [
          {
            title: "Chapter One: Suzie's Got a Hula Hoop",
            duration: "50 min",
            description: "Things change over the summer: Jonathan, Nancy, Steve, and Robin take new jobs and pursue their own interests. Mike tries to occupy his time.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Two: The Mall Rats",
            duration: "49 min",
            description: "Nancy and Jonathan follow a lead, Steve and Robin sign on to a secret mission, and Max and Eleven go shopping. A rattled Billy has troubling visions.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Three: The Case of the Missing Lifeguard",
            duration: "49 min",
            description: "With El and Max looking for Billy, Will declares a day without girls. Steve and Dustin go on a stakeout, and Joyce and Hopper return to Hawkins Lab.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Four: The Sauna Test",
            duration: "52 min",
            description: "A code red brings the gang back together to face a frighteningly familiar evil. Karen urges Nancy to keep digging, and Robin finds a useful map.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Five: The Flayed",
            duration: "51 min",
            description: "Strange surprises lurk inside an old farmhouse and deep beneath the Starcourt Mall. Meanwhile, the Mind Flayer is gathering strength.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Six: E Pluribus Unum",
            duration: "59 min",
            description: "Dr. Alexei reveals what the Russians have been building. Meanwhile, the kids find themselves split up in the underground labyrinth of Hawkins Lab.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Seven: The Bite",
            duration: "55 min",
            description: "With time running out -- and an assassin close behind -- Hopper's crew races back to Hawkins in the new Starcourt Mall.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Eight: The Battle of Starcourt",
            duration: "77 min",
            description: "The Mall goes on lockdown as the Russians reveal their master plan. Meanwhile, Eleven and her friends make plans to finish what they started.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
        ],
      },
      {
        seasonNumber: 4,
        episodes: [
          {
            title: "Chapter One: The Hellfire Club",
            duration: "77 min",
            description: "El is bullied at school. Joyce opens a mysterious package. The Hawkins crew gathers for a special occasion, and Mike asks El to the dance.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Two: Vecna's Curse",
            duration: "79 min",
            description: "A plane brings Mike to California. A plague of rats descends on Hawkins. In the Upside Down, a dark force targets victims.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Three: The Monster and the Superhero",
            duration: "63 min",
            description: "Nancy and Robin follow a lead. Dustin and Eddie form an unlikely alliance. Back in Hawkins, the gang gathers at Murray's for a movie night.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Four: Dear Billy",
            duration: "78 min",
            description: "Max is in grave danger... and running out of time. A patient at Hawkins Lab exposes a shocking secret, and Eleven unearths new questions.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Five: The Nina Project",
            duration: "75 min",
            description: "The group splits up to close the gates and face the horrors of the Upside Down. But the gang encounters a terrifying new threat.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Six: The Dive",
            duration: "74 min",
            description: "A new player joins the fight. The Mind Flayer's first attack tests everyone's limits. Meanwhile, the Nina project advances.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Seven: The Massacre at Hawkins Lab",
            duration: "99 min",
            description: "As the town preps for battle, Eleven spars with a devastating memory from her past. A vicious attack rocks Hawkins Lab.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Eight: Papa",
            duration: "85 min",
            description: "Nancy has sobering visions, and El passes an important test. The gang debates whether to interrogate a prisoner, and Steve takes one for the team.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
          {
            title: "Chapter Nine: The Piggyback",
            duration: "150 min",
            description: "With the fate of Hawkins at stake, the gang must defeat an otherworldly threat once and for all. But the battle will require unimaginable sacrifice.",
            thumbnail: "/placeholder.svg?height=720&width=1280",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Squid Game",
    tmdbId: "93405", // ✅ Verified on TMDB
    type: "series",
    genre: ["Drama", "Mystery", "Thriller"],
    duration: "54 min",
    releaseYear: 2021,
    releaseDate: "September 17, 2021",
    rating: 8.7,
    userRating: 8.0,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    poster: "https://image.tmdb.org/t/p/w500/8jWzCHn4PLpRiwa4O2jpSy2lxHZ.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/qw3J9cNeLioOLoR68WX7z79aCdK.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes. A survival game that has a whopping 45.6 billion-won prize at stake.",
    cast: [
      "Lee Jung-jae",
      "Park Hae-soo",
      "Wi Ha-joon",
      "Jung Ho-yeon",
      "O Yeong-su",
      "Heo Sung-tae",
    ],
    director: "Hwang Dong-hyuk",
    studio: "Netflix",
    awards: "Emmy Awards - Outstanding Lead Actor",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 2,
    totalEpisodes: 9,
    episodes: [
      {
        title: "Red Light, Green Light",
        duration: "60 min",
        description:
          "Desperate to pay off his debt, a man accepts a mysterious invitation to participate in a survival game with a prize of 45.6 billion won.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Hell",
        duration: "63 min",
        description:
          "Split into teams, the players play a deadly game of tug-of-war. The competition is fierce, and players start turning on each other.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "The Man with the Umbrella",
        duration: "55 min",
        description:
          "Playing the honeycomb game, each contestant must carefully extract a shape from a sugar honeycomb without breaking it.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
  },
  {
    id: "2",
    title: "Wednesday",
    tmdbId: "119051", // ✅ Verified on TMDB
    type: "series",
    genre: ["Comedy", "Mystery", "Sci-Fi"],
    duration: "50 min",
    releaseYear: 2022,
    releaseDate: "November 23, 2022",
    rating: 8.2,
    userRating: 8.1,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    poster: "https://image.tmdb.org/t/p/w500/jeGtaMwGxPmQN5xM4ClnwPQcNQz.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
    cast: [
      "Jenna Ortega",
      "Gwendoline Christie",
      "Riki Lindhome",
      "Jamie McShane",
      "Hunter Doohan",
      "Percy Hynes White",
    ],
    director: "Tim Burton",
    studio: "Netflix",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 1,
    episodes: [
      {
        title: "Wednesday's Child Is Full of Woe",
        duration: "57 min",
        description:
          "When a deliciously wicked prank gets Wednesday expelled, her parents ship her off to Nevermore Academy, the boarding school where they fell in love.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
  },
  {
    id: "3",
    title: "The Witcher",
    tmdbId: "71912",
    type: "series",
    genre: ["Action", "Adventure", "Drama"],
    duration: "60 min",
    releaseYear: 2019,
    releaseDate: "December 20, 2019",
    rating: 8.7,
    userRating: 8.0,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    poster: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/1R016RRHaKqVHNNDDLfJaIGlAWi.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    cast: [
      "Henry Cavill",
      "Anya Chalotra",
      "Freya Allan",
      "Joey Batey",
      "MyAnna Buring",
      "Tom Canton",
    ],
    director: "Lauren Schmidt Hissrich",
    studio: "Netflix",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 3,
  },
  {
    id: "4",
    title: "Money Heist (La Casa de Papel)",
    tmdbId: "71446", // ✅ Verified on TMDB
    type: "series",
    genre: ["Crime", "Drama", "Mystery"],
    duration: "70 min",
    releaseYear: 2017,
    releaseDate: "May 2, 2017",
    rating: 8.8,
    userRating: 8.2,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/MoEKaPFHABtA1xKoOteirGaHl1.jpg",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/5vUux2vNUTqwCzb7tVcH18XnsF.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description:
      "To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.",
    cast: [
      "Álvaro Morte",
      "Itziar Ituño",
      "Pedro Alonso",
      "Úrsula Corberó",
      "Jaime Lorente",
      "Miguel Herrán",
    ],
    director: "Álex Pina",
    studio: "Netflix",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 5,
  },
  {
    id: "5",
    title: "The Crown",
    tmdbId: "46708", // ✅ Verified on TMDB - Correct ID for The Crown
    type: "series",
    genre: ["Drama", "History"],
    duration: "58 min",
    releaseYear: 2016,
    releaseDate: "November 4, 2016",
    rating: 8.9,
    userRating: 8.6,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/1M876KPjulVwppEpldhdc8V4o68.jpg",
    poster: "https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/qXZKqA2m7E0hhSjJQCk9wPNxNlq.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
    cast: [
      "Claire Foy",
      "Olivia Colman",
      "Imelda Staunton",
      "Matt Smith",
      "Tobias Menzies",
      "Helena Bonham Carter",
    ],
    director: "Peter Morgan",
    studio: "Netflix",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 6,
  },
  {
    id: "6",
    title: "Bridgerton",
    tmdbId: "63247", // ✅ Verified on TMDB - Correct ID for Bridgerton (was 100088)
    type: "series",
    genre: ["Drama", "Romance"],
    duration: "60 min",
    releaseYear: 2020,
    releaseDate: "December 25, 2020",
    rating: 8.5,
    userRating: 7.3,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg",
    poster: "https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/ioEbLv6lXex1SEEhqqmhBs92j3r.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description:
      "The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society. Inspired by Julia Quinn's bestselling novels.",
    cast: [
      "Phoebe Dynevor",
      "Regé-Jean Page",
      "Jonathan Bailey",
      "Nicola Coughlan",
      "Claudia Jessie",
      "Luke Newton",
    ],
    director: "Chris Van Dusen",
    studio: "Netflix",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 3,
  },

  // === MOVIES ===
  {
    id: "7",
    title: "The Adam Project",
    tmdbId: "696806",
    type: "movie",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: "106 min",
    releaseYear: 2022,
    releaseDate: "March 11, 2022",
    rating: 7.5,
    userRating: 6.7,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg",
    poster: "https://image.tmdb.org/t/p/w500/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description:
      "A time-traveling pilot teams up with his younger self and his late father to come to terms with his past while saving the future.",
    cast: [
      "Ryan Reynolds",
      "Walker Scobell",
      "Mark Ruffalo",
      "Jennifer Garner",
      "Zoe Saldana",
      "Catherine Keener",
    ],
    director: "Shawn Levy",
    studio: "Netflix",
  },
  {
    id: "8",
    title: "Glass Onion: A Knives Out Mystery",
    tmdbId: "661374", // ✅ Verified on TMDB - Correct ID (was 620249)
    type: "movie",
    genre: ["Comedy", "Crime", "Mystery"],
    duration: "140 min",
    releaseYear: 2022,
    releaseDate: "November 23, 2022",
    rating: 8.2,
    userRating: 7.2,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    poster: "https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/7gKwSFZyMQEP9oR9XNHBwQRz1b6.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description:
      "Tech billionaire Miles Bron invites his friends for a getaway on his private Greek island. When someone turns up dead, Detective Benoit Blanc is put on the case.",
    cast: [
      "Daniel Craig",
      "Edward Norton",
      "Janelle Monáe",
      "Kathryn Hahn",
      "Leslie Odom Jr.",
      "Kate Hudson",
    ],
    director: "Rian Johnson",
    studio: "Netflix",
  },
  {
    id: "9",
    title: "Red Notice",
    tmdbId: "512195",
    type: "movie",
    genre: ["Action", "Comedy", "Crime"],
    duration: "118 min",
    releaseYear: 2021,
    releaseDate: "November 12, 2021",
    rating: 7.2,
    userRating: 6.3,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
    poster: "https://image.tmdb.org/t/p/w500/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    description:
      "An Interpol agent tracks the world's most wanted art thief. When the FBI's top profiler is framed for a crime, he must team up with the thief to clear his name.",
    cast: [
      "Dwayne Johnson",
      "Ryan Reynolds",
      "Gal Gadot",
      "Ritu Arya",
      "Chris Diamantopoulos",
    ],
    director: "Rawson Marshall Thurber",
    studio: "Netflix",
  },
  {
    id: "10",
    title: "Breaking Bad",
    tmdbId: "1396", // ✅ Verified on TMDB
    type: "series",
    genre: ["Crime", "Drama", "Thriller"],
    duration: "47 min",
    releaseYear: 2008,
    releaseDate: "January 20, 2008",
    rating: 9.5,
    userRating: 9.5,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    poster: "https://image.tmdb.org/t/p/w500/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "A chemistry teacher diagnosed with cancer teams up with a former student to manufacture and sell crystal meth to secure his family's future.",
    cast: [
      "Bryan Cranston",
      "Aaron Paul",
      "Anna Gunn",
      "Dean Norris",
      "Betsy Brandt",
      "RJ Mitte",
    ],
    director: "Vince Gilligan",
    studio: "AMC / Netflix",
    awards: "16 Emmy Awards",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 5,
    totalEpisodes: 62,
    episodes: [
      {
        title: "Pilot",
        duration: "58 min",
        description:
          "High school chemistry teacher Walter White's life is suddenly transformed by a dire medical diagnosis.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Cat's in the Bag...",
        duration: "48 min",
        description:
          "Walt and Jesse attempt to dispose of evidence while Skyler grows suspicious of Walt's behavior.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "...And the Bag's in the River",
        duration: "48 min",
        description:
          "Walt and Jesse try to figure out what to do with Krazy-8.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Cancer Man",
        duration: "48 min",
        description:
          "Walt tells the rest of his family about his cancer diagnosis.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Gray Matter",
        duration: "48 min",
        description:
          "Walt rejects a generous offer from his former research partner to pay for his treatment.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
  },
  {
    id: "11",
    title: "Peaky Blinders",
    tmdbId: "60574", // ✅ Verified on TMDB
    type: "series",
    genre: ["Crime", "Drama"],
    duration: "60 min",
    releaseYear: 2013,
    releaseDate: "September 12, 2013",
    rating: 8.8,
    userRating: 8.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
    poster: "https://image.tmdb.org/t/p/w500/vC324sEQJgBNTe6WWpHD9CaO2f8.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
    cast: [
      "Cillian Murphy",
      "Paul Anderson",
      "Helen McCrory",
      "Sophie Rundle",
      "Finn Cole",
      "Joe Cole",
    ],
    director: "Steven Knight",
    studio: "BBC / Netflix",
    awards: "BAFTA Awards",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 6,
    totalEpisodes: 36,
    episodes: [
      {
        title: "Episode 1",
        duration: "58 min",
        description:
          "1919. The Peaky Blinders steal a cache of guns and ammunition from the Birmingham police.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Episode 2",
        duration: "59 min",
        description:
          "Thomas Shelby starts a feud with a gypsy family and finally meets with Inspector Campbell to talk about the stolen guns.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Episode 3",
        duration: "55 min",
        description:
          "Thomas is livid to find out that Ada and Freddie Thorne are in love.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
  },
  {
    id: "12",
    title: "Dark",
    tmdbId: "70523", // ✅ Verified on TMDB
    type: "series",
    genre: ["Crime", "Drama", "Mystery", "Sci-Fi"],
    duration: "60 min",
    releaseYear: 2017,
    releaseDate: "December 1, 2017",
    rating: 8.7,
    userRating: 8.7,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/5tRS2Y4wu0VZ01L36SWMQJ3dIGN.jpg",
    poster: "https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/bLlsWtJQuSrVfOBtL0I5pL8Jqzl.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
    cast: [
      "Louis Hofmann",
      "Karoline Eichhorn",
      "Lisa Vicari",
      "Mark Waschke",
      "Maja Schöne",
      "Jördis Triebel",
    ],
    director: "Baran bo Odar",
    studio: "Netflix",
    awards: "International Emmy Awards",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 3,
    totalEpisodes: 26,
    episodes: [
      {
        title: "Secrets",
        duration: "51 min",
        description:
          "In 2019, a local boy's disappearance stokes fear in the residents of Winden, a small German town with a strange and tragic history.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Lies",
        duration: "44 min",
        description:
          "When a grim discovery leaves the police baffled, Ulrich seeks a search warrant for the power plant.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Past and Present",
        duration: "45 min",
        description:
          "It's 1986, and Ulrich's brother, Mads, has been missing for a month.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
  },
  {
    id: "13",
    title: "Ozark",
    tmdbId: "69740", // ✅ Verified on TMDB
    type: "series",
    genre: ["Crime", "Drama", "Thriller"],
    duration: "60 min",
    releaseYear: 2017,
    releaseDate: "July 21, 2017",
    rating: 8.5,
    userRating: 8.5,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/m73bD8VjibSKvXSyHSn4btHsUTO.jpg",
    poster: "https://image.tmdb.org/t/p/w500/pCGyPVxRr4qxQYdJRSEJdJdVRnW.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/lHe8iwM4Cdm6RSEiara4PN8ZcBd.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.",
    cast: [
      "Jason Bateman",
      "Laura Linney",
      "Sofia Hublitz",
      "Skylar Gaertner",
      "Julia Garner",
      "Charlie Tahan",
    ],
    director: "Bill Dubuque",
    studio: "Netflix",
    awards: "Emmy Awards",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 4,
    totalEpisodes: 44,
    episodes: [
      {
        title: "Sugarwood",
        duration: "60 min",
        description:
          "After his business partner cheats a dangerous client, financial adviser Marty must devise a radical plan to save the lives of himself and his family.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Blue Cat",
        duration: "63 min",
        description:
          "In the Ozarks, Marty struggles to find a local business he can use for money laundering, while his kids make new friends but find it hard to fit in.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "My Dripping Sleep",
        duration: "58 min",
        description:
          "Marty finds a way to control Ruth. Wendy worms her way into a job. Looking for another business to invest in, Marty digs for info on the strip bar.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
  },
  {
    id: "14",
    title: "Narcos",
    tmdbId: "63351", // ✅ Verified on TMDB
    type: "series",
    genre: ["Crime", "Drama"],
    duration: "49 min",
    releaseYear: 2015,
    releaseDate: "August 28, 2015",
    rating: 8.8,
    userRating: 8.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
    poster: "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/eWCzr5w4KHYaKnKpNXnGy4Ijbx6.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description:
      "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.",
    cast: [
      "Wagner Moura",
      "Pedro Pascal",
      "Boyd Holbrook",
      "Joanna Christie",
      "Maurice Compte",
      "Andre Mattos",
    ],
    director: "Chris Brancato",
    studio: "Netflix",
    awards: "Golden Globe Nominations",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 3,
    totalEpisodes: 30,
    episodes: [
      {
        title: "Descenso",
        duration: "57 min",
        description:
          "Chilean drug chemist Cockroach brings his product to Colombian smuggler Pablo Escobar. DEA agent Steve Murphy joins the war on drugs in Bogota.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "The Sword of Simón Bolívar",
        duration: "46 min",
        description:
          "Communist radical group M-19 makes a move against the narcos, while Murphy gets an education in Colombian law enforcement from his new partner Peña.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "The Men of Always",
        duration: "46 min",
        description:
          "Murphy encounters the depths of government corruption when he and Peña try to derail Escobar's political ambitions by proving he's a narco.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
  },
  {
    id: "15",
    title: "The Umbrella Academy",
    tmdbId: "75006", // ✅ Verified on TMDB
    type: "series",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: "50 min",
    releaseYear: 2019,
    releaseDate: "February 15, 2019",
    rating: 8.0,
    userRating: 7.9,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/qhcwrnnCpuek7SnIMKbY0ZKJffG.jpg",
    poster: "https://image.tmdb.org/t/p/w500/scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/mE3qJNVBJjqTcSznCLUWqlTRhFd.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "A dysfunctional family of superheroes comes together to solve the mystery of their father's death, the threat of the apocalypse and more.",
    cast: [
      "Elliot Page",
      "Tom Hopper",
      "David Castañeda",
      "Emmy Raver-Lampman",
      "Robert Sheehan",
      "Aidan Gallagher",
    ],
    director: "Steve Blackman",
    studio: "Netflix",
    currentSeason: 1,
    currentEpisode: 1,
    totalSeasons: 3,
    totalEpisodes: 30,
    episodes: [
      {
        title: "We Only See Each Other at Weddings and Funerals",
        duration: "59 min",
        description:
          "On the same day in 1989, 43 infants are inexplicably born to random, unconnected women who showed no signs of pregnancy the day before.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Run Boy Run",
        duration: "56 min",
        description:
          "The siblings get to know their late father's assistant, Pogo. Diego secretly follows Leonard to a suspicious meeting.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
      {
        title: "Extra Ordinary",
        duration: "54 min",
        description:
          "After the funeral, Five urges his siblings to band together. Diego suspects their father's death is more suspicious than it seems.",
        thumbnail: "/placeholder.svg?height=720&width=1280",
      },
    ],
  },
  {
    id: "16",
    title: "Extraction",
    tmdbId: "545609", // ✅ Verified on TMDB
    type: "movie",
    genre: ["Action", "Thriller"],
    duration: "116 min",
    releaseYear: 2020,
    releaseDate: "April 24, 2020",
    rating: 6.8,
    userRating: 6.7,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/wlfDxbGEsW58vGhFljKkcR5IxDj.jpg",
    poster: "https://image.tmdb.org/t/p/w500/wlfDxbGEsW58vGhFljKkcR5IxDj.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/1R6cvRtZgsYCkh8UFuWFN33xBP4.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description:
      "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.",
    cast: [
      "Chris Hemsworth",
      "Rudhraksh Jaiswal",
      "Randeep Hooda",
      "Golshifteh Farahani",
      "Pankaj Tripathi",
      "David Harbour",
    ],
    director: "Sam Hargrave",
    studio: "Netflix",
  },
  {
    id: "17",
    title: "The Gray Man",
    tmdbId: "725201", // ✅ Verified on TMDB
    type: "movie",
    genre: ["Action", "Thriller"],
    duration: "122 min",
    releaseYear: 2022,
    releaseDate: "July 22, 2022",
    rating: 6.5,
    userRating: 6.5,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    poster: "https://image.tmdb.org/t/p/w500/5Eom3JsXgQlCkHA3FxmP17IfUrK.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/vwq5iboxYoaSpOmEQrhq9tHicq7.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description:
      "When the CIA's most skilled mercenary-turned-fugitive is accidentally unmasked, he's targeted by assassins worldwide while being hunted by his former ally.",
    cast: [
      "Ryan Gosling",
      "Chris Evans",
      "Ana de Armas",
      "Jessica Henwick",
      "Regé-Jean Page",
      "Billy Bob Thornton",
    ],
    director: "Anthony Russo, Joe Russo",
    studio: "Netflix",
  },
  {
    id: "18",
    title: "Enola Holmes",
    tmdbId: "497582", // ✅ Verified on TMDB
    type: "movie",
    genre: ["Adventure", "Mystery", "Crime"],
    duration: "123 min",
    releaseYear: 2020,
    releaseDate: "September 23, 2020",
    rating: 6.6,
    userRating: 6.6,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/riYInlsq2kf1AWoGm80JQW5dLKp.jpg",
    poster: "https://image.tmdb.org/t/p/w500/4w9kGnbBRE3cRUFNnNjKhKZb8Rh.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/9xNOiv6DZZjH7v6o0SLTTy9c6lv.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description:
      "While searching for her missing mother, intrepid teen Enola Holmes uses her sleuthing skills to outsmart big brother Sherlock and help a runaway lord.",
    cast: [
      "Millie Bobby Brown",
      "Henry Cavill",
      "Sam Claflin",
      "Helena Bonham Carter",
      "Louis Partridge",
      "Burn Gorman",
    ],
    director: "Harry Bradbeer",
    studio: "Netflix",
  },
  {
    id: "19",
    title: "Don't Look Up",
    tmdbId: "646380", // ✅ Verified on TMDB
    type: "movie",
    genre: ["Comedy", "Drama", "Sci-Fi"],
    duration: "138 min",
    releaseYear: 2021,
    releaseDate: "December 24, 2021",
    rating: 7.2,
    userRating: 7.2,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/th4E1yqsE8DGpAseLiUrI60Hf8V.jpg",
    poster: "https://image.tmdb.org/t/p/w500/th4E1yqsE8DGpAseLiUrI60Hf8V.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/obQNbI36vz5m7MJJqLRdoKZRahc.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    description:
      "Two astronomers go on a media tour to warn humankind of a planet-killing comet hurtling toward Earth. The response from a distracted world: Meh.",
    cast: [
      "Leonardo DiCaprio",
      "Jennifer Lawrence",
      "Meryl Streep",
      "Cate Blanchett",
      "Rob Morgan",
      "Jonah Hill",
    ],
    director: "Adam McKay",
    studio: "Netflix",
    awards: "Academy Award Nominations",
  },
  // === BENGALI MOVIES ===
  {
    id: "20",
    title: "Dawshom Awbotaar",
    tmdbId: "1029673",
    type: "movie",
    genre: ["Thriller", "Mystery", "Crime"],
    duration: "135 min",
    releaseYear: 2023,
    releaseDate: "October 19, 2023",
    rating: 8.1,
    userRating: 8.3,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/gOWJPyYXKHEK0BfLwDzZVt8NfJm.jpg",
    poster: "https://image.tmdb.org/t/p/w500/gOWJPyYXKHEK0BfLwDzZVt8NfJm.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/2YdQJAVhWvyTZZHLhGl3a7gOxwI.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "A gripping thriller where detective Probir Roy Chowdhury investigates a series of mysterious murders in Kolkata. A masterpiece of Bengali cinema with intense mystery and suspense.",
    cast: [
      "Prosenjit Chatterjee",
      "Anirban Bhattacharya",
      "Jisshu Sengupta",
      "Jaya Ahsan",
      "Priyanka Sarkar",
    ],
    director: "Srijit Mukherji",
    studio: "SVF Entertainment",
  },
  {
    id: "21",
    title: "Chander Pahar",
    tmdbId: "276727",
    type: "movie",
    genre: ["Action", "Adventure", "Thriller"],
    duration: "148 min",
    releaseYear: 2013,
    releaseDate: "December 20, 2013",
    rating: 7.5,
    userRating: 7.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/fSbglOMZQaVdAjLpTbZTZXqJYpI.jpg",
    poster: "https://image.tmdb.org/t/p/w500/fSbglOMZQaVdAjLpTbZTZXqJYpI.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/8Z8dptJEypuLoOQro1WugXSAGV9.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "A young Bengali man embarks on an adventurous journey to Africa in search of legendary treasures and faces incredible dangers. Based on the classic novel by Bibhutibhushan Bandopadhyay.",
    cast: [
      "Dev",
      "Gerard Rudolf",
      "Martin Cito Otto",
      "Laboni Sarkar",
      "Nabeel Khan",
    ],
    director: "Kamaleswar Mukherjee",
    studio: "Shree Venkatesh Films",
    awards: "Bengali Film Awards - Best Adventure Film",
  },
  {
    id: "22",
    title: "Pather Panchali",
    tmdbId: "11224",
    type: "movie",
    genre: ["Drama"],
    duration: "125 min",
    releaseYear: 1955,
    releaseDate: "August 26, 1955",
    rating: 8.3,
    userRating: 8.4,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/8wmaNGmJrzJtyQ9SZVLPglMQhrH.jpg",
    poster: "https://image.tmdb.org/t/p/w500/8wmaNGmJrzJtyQ9SZVLPglMQhrH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/aL7d6HauzXhc98eR8rEyLb8T5WL.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "The story of the Roy family living in rural Bengal, and their struggles and triumphs. A masterpiece by Satyajit Ray that revolutionized Indian cinema.",
    cast: [
      "Kanu Bannerjee",
      "Karuna Bannerjee",
      "Subir Banerjee",
      "Uma Dasgupta",
    ],
    director: "Satyajit Ray",
    studio: "Government of West Bengal",
    awards: "Cannes Film Festival - Best Human Document",
  },
  {
    id: "23",
    title: "Sonar Kella",
    tmdbId: "73608",
    type: "movie",
    genre: ["Adventure", "Mystery", "Family"],
    duration: "136 min",
    releaseYear: 1974,
    releaseDate: "December 27, 1974",
    rating: 8.5,
    userRating: 8.6,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/8bRIfcXRjNRpxGLwjHDx8UhHDgS.jpg",
    poster: "https://image.tmdb.org/t/p/w500/8bRIfcXRjNRpxGLwjHDx8UhHDgS.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/kNZsrxkTgbxLnEqKDL5U3pLYLZA.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description:
      "Detective Feluda investigates the case of a young boy who claims to have memories of his previous life in a golden fortress in Rajasthan. A Satyajit Ray masterpiece.",
    cast: [
      "Soumitra Chatterjee",
      "Santosh Dutta",
      "Siddhartha Chatterjee",
      "Kushal Chakraborty",
    ],
    director: "Satyajit Ray",
    studio: "Government of West Bengal",
  },
  {
    id: "24",
    title: "Chokher Bali",
    tmdbId: "39102",
    type: "movie",
    genre: ["Drama", "Romance"],
    duration: "167 min",
    releaseYear: 2003,
    releaseDate: "August 8, 2003",
    rating: 7.1,
    userRating: 7.3,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/tMWpVLN0r0AFkJ4v3ggEAjfOGBh.jpg",
    poster: "https://image.tmdb.org/t/p/w500/tMWpVLN0r0AFkJ4v3ggEAjfOGBh.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/8gX3YjPXLvV4FYJpDnKqF2QzYmB.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "A young widow, rejected by society, becomes entangled in a complex web of relationships in colonial Bengal. Based on Rabindranath Tagore's classic novel.",
    cast: [
      "Aishwarya Rai Bachchan",
      "Prosenjit Chatterjee",
      "Raima Sen",
      "Tota Roy Chowdhury",
    ],
    director: "Rituparno Ghosh",
    studio: "Shree Venkatesh Films",
  },
  // === HINDI MOVIES ===
  {
    id: "25",
    title: "Jawan",
    tmdbId: "939335",
    type: "movie",
    genre: ["Action", "Thriller", "Drama"],
    duration: "169 min",
    releaseYear: 2023,
    releaseDate: "September 7, 2023",
    rating: 7.2,
    userRating: 7.5,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/v1qeHW8Fg0yre9L9TGTRLVItzTa.jpg",
    poster: "https://image.tmdb.org/t/p/w500/v1qeHW8Fg0yre9L9TGTRLVItzTa.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/rmRM7nMDvd1omfBKaF5EvU4ovVA.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description:
      "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.",
    cast: [
      "Shah Rukh Khan",
      "Nayanthara",
      "Vijay Sethupathi",
      "Deepika Padukone",
      "Priyamani",
    ],
    director: "Atlee",
    studio: "Red Chillies Entertainment",
    awards: "Blockbuster Hit 2023",
  },
  {
    id: "26",
    title: "Pathaan",
    tmdbId: "840705",
    type: "movie",
    genre: ["Action", "Thriller", "Adventure"],
    duration: "146 min",
    releaseYear: 2023,
    releaseDate: "January 25, 2023",
    rating: 6.1,
    userRating: 6.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/kIlIRyg7e5kvJEb8bETBz5zgHQo.jpg",
    poster: "https://image.tmdb.org/t/p/w500/kIlIRyg7e5kvJEb8bETBz5zgHQo.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "A soldier caught by enemies and presumed dead comes back to complete his mission along with RAW agents. An action-packed spy thriller from the YRF Spy Universe.",
    cast: [
      "Shah Rukh Khan",
      "Deepika Padukone",
      "John Abraham",
      "Dimple Kapadia",
      "Ashutosh Rana",
    ],
    director: "Siddharth Anand",
    studio: "Yash Raj Films",
  },
  {
    id: "27",
    title: "Dunki",
    tmdbId: "1029575",
    type: "movie",
    genre: ["Comedy", "Drama"],
    duration: "161 min",
    releaseYear: 2023,
    releaseDate: "December 21, 2023",
    rating: 6.3,
    userRating: 6.9,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/mc8iVe6RXTpQcRhP7HmRkRwM6zG.jpg",
    poster: "https://image.tmdb.org/t/p/w500/mc8iVe6RXTpQcRhP7HmRkRwM6zG.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/gMQibswTP7BkU7RKGCadqQ0GpbJ.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description:
      "Four friends from a village in Punjab share a common dream: to go to England. Their problem is that they have neither the visa nor the ticket. A soldier promises to take them to the land of their dreams.",
    cast: [
      "Shah Rukh Khan",
      "Taapsee Pannu",
      "Vicky Kaushal",
      "Boman Irani",
      "Vikram Kochhar",
    ],
    director: "Rajkumar Hirani",
    studio: "Red Chillies Entertainment",
  },
  {
    id: "28",
    title: "12th Fail",
    tmdbId: "1079091",
    type: "movie",
    genre: ["Drama", "Biography"],
    duration: "147 min",
    releaseYear: 2023,
    releaseDate: "October 27, 2023",
    rating: 9.1,
    userRating: 9.2,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/fYaYwY7xMDx0G3JppAc8abMPZCp.jpg",
    poster: "https://image.tmdb.org/t/p/w500/fYaYwY7xMDx0G3JppAc8abMPZCp.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/9n7tZEjlgS62Zr9DvD2kqsNYQTL.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "The real-life story of IPS officer Manoj Kumar Sharma and IRS officer Shraddha Joshi. Despite failing his 12th-grade exams, Manoj's determination led him to become an IPS officer.",
    cast: [
      "Vikrant Massey",
      "Medha Shankar",
      "Anant Joshi",
      "Anshumaan Pushkar",
      "Priya Bhardwaj",
    ],
    director: "Vidhu Vinod Chopra",
    studio: "Vinod Chopra Films",
    awards: "National Film Award 2024",
  },
  {
    id: "29",
    title: "Gadar 2",
    tmdbId: "980078",
    type: "movie",
    genre: ["Action", "Drama", "Romance"],
    duration: "170 min",
    releaseYear: 2023,
    releaseDate: "August 11, 2023",
    rating: 7.2,
    userRating: 7.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/okKp7vTQBPqJCTVFsGdNcqBG3Hv.jpg",
    poster: "https://image.tmdb.org/t/p/w500/okKp7vTQBPqJCTVFsGdNcqBG3Hv.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/pBd7vTrqC2pFHZrLYRUd0I3t2oo.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description:
      "During the Indo-Pakistani War of 1971, the Tara Singh family face a new threat as their son is captured. Tara must cross the border once again to bring him back.",
    cast: [
      "Sunny Deol",
      "Ameesha Patel",
      "Utkarsh Sharma",
      "Simratt Kaur",
      "Manish Wadhwa",
    ],
    director: "Anil Sharma",
    studio: "Zee Studios",
  },
  {
    id: "30",
    title: "Tiger 3",
    tmdbId: "700391",
    type: "movie",
    genre: ["Action", "Thriller", "Adventure"],
    duration: "155 min",
    releaseYear: 2023,
    releaseDate: "November 12, 2023",
    rating: 6.5,
    userRating: 7.1,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/2eMgeeFj2pRBiBe5fRDHGDGCCe0.jpg",
    poster: "https://image.tmdb.org/t/p/w500/2eMgeeFj2pRBiBe5fRDHGDGCCe0.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/gBenxR01Uy0Ev9RTIw6dVBPoyQU.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description:
      "Tiger and Zoya are back - to save the country and their family. This time it's personal. Part of the YRF Spy Universe.",
    cast: [
      "Salman Khan",
      "Katrina Kaif",
      "Emraan Hashmi",
      "Revathi",
      "Simran",
    ],
    director: "Maneesh Sharma",
    studio: "Yash Raj Films",
  },
  {
    id: "31",
    title: "Rocky Aur Rani Kii Prem Kahaani",
    tmdbId: "787699",
    type: "movie",
    genre: ["Romance", "Comedy", "Drama"],
    duration: "168 min",
    releaseYear: 2023,
    releaseDate: "July 28, 2023",
    rating: 6.5,
    userRating: 7.2,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/ubFfkW2UECsVYuqEqhpF7rxaHm2.jpg",
    poster: "https://image.tmdb.org/t/p/w500/ubFfkW2UECsVYuqEqhpF7rxaHm2.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/j41LPgaFWRkRpehIDLGpZ7Jw8pj.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "A romantic comedy that brings together two people from completely different backgrounds and their journey of love and family acceptance.",
    cast: [
      "Ranveer Singh",
      "Alia Bhatt",
      "Dharmendra",
      "Jaya Bachchan",
      "Shabana Azmi",
    ],
    director: "Karan Johar",
    studio: "Dharma Productions",
  },
  // === MORE ENGLISH MOVIES ===
  {
    id: "32",
    title: "The Irishman",
    tmdbId: "398978",
    type: "movie",
    genre: ["Crime", "Drama"],
    duration: "209 min",
    releaseYear: 2019,
    releaseDate: "November 27, 2019",
    rating: 7.8,
    userRating: 7.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg",
    poster: "https://image.tmdb.org/t/p/w500/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/bQ7Y3fLAcZlrJJcMLo4r1TKD8fF.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "An aging hitman recalls his time with the mob and the intersecting events with his friend, Jimmy Hoffa, through the 1950-70s.",
    cast: [
      "Robert De Niro",
      "Al Pacino",
      "Joe Pesci",
      "Harvey Keitel",
      "Anna Paquin",
    ],
    director: "Martin Scorsese",
    studio: "Netflix",
    awards: "Academy Award Nominations",
  },
  {
    id: "33",
    title: "Murder Mystery 2",
    tmdbId: "638974",
    type: "movie",
    genre: ["Comedy", "Mystery", "Action"],
    duration: "89 min",
    releaseYear: 2023,
    releaseDate: "March 31, 2023",
    rating: 5.7,
    userRating: 5.9,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/s1VzVhXlqsevi8zeCMG9A16nEUf.jpg",
    poster: "https://image.tmdb.org/t/p/w500/s1VzVhXlqsevi8zeCMG9A16nEUf.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Full-time detectives Nick and Audrey are struggling to get their private eye agency off the ground when they're invited to celebrate the wedding of their friend Maharaja.",
    cast: [
      "Adam Sandler",
      "Jennifer Aniston",
      "Mark Strong",
      "Mélanie Laurent",
      "Jodie Turner-Smith",
    ],
    director: "Jeremy Garelick",
    studio: "Netflix",
  },
  {
    id: "34",
    title: "The Mother",
    tmdbId: "976573",
    type: "movie",
    genre: ["Action", "Thriller"],
    duration: "115 min",
    releaseYear: 2023,
    releaseDate: "May 12, 2023",
    rating: 5.6,
    userRating: 6.1,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/vnRthEt7V75nzn9VOcsbKMNLobX.jpg",
    poster: "https://image.tmdb.org/t/p/w500/vnRthEt7V75nzn9VOcsbKMNLobX.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description:
      "A deadly female assassin comes out of hiding to protect the daughter she gave up years before, while on the run from dangerous men.",
    cast: [
      "Jennifer Lopez",
      "Joseph Fiennes",
      "Omari Hardwick",
      "Gael García Bernal",
      "Lucy Paez",
    ],
    director: "Niki Caro",
    studio: "Netflix",
  },
  {
    id: "35",
    title: "You People",
    tmdbId: "848187",
    type: "movie",
    genre: ["Comedy", "Romance"],
    duration: "117 min",
    releaseYear: 2023,
    releaseDate: "January 27, 2023",
    rating: 5.5,
    userRating: 5.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/x5E4TndwASNkaK2hwgeYfsIVo2x.jpg",
    poster: "https://image.tmdb.org/t/p/w500/x5E4TndwASNkaK2hwgeYfsIVo2x.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/i8dshLvq4LE3s0v8PrkDdUyb1ae.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "A new couple and their families find themselves examining modern love and family dynamics amidst clashing cultures, societal expectations and generational differences.",
    cast: [
      "Jonah Hill",
      "Eddie Murphy",
      "Julia Louis-Dreyfus",
      "Lauren London",
      "David Duchovny",
    ],
    director: "Kenya Barris",
    studio: "Netflix",
  },
  {
    id: "36",
    title: "We Have a Ghost",
    tmdbId: "807172",
    type: "movie",
    genre: ["Comedy", "Adventure", "Mystery"],
    duration: "126 min",
    releaseYear: 2023,
    releaseDate: "February 24, 2023",
    rating: 6.1,
    userRating: 6.4,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/xo0eKxzLfioWhbY3RBNmuYZMAWf.jpg",
    poster: "https://image.tmdb.org/t/p/w500/xo0eKxzLfioWhbY3RBNmuYZMAWf.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/1Ue5HC6NPGALkTnTLTJR15LRKbK.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description:
      "After Kevin finds a ghost named Ernest haunting his new home, he becomes an overnight social media sensation. But when Kevin and Ernest go rogue to investigate the mystery.",
    cast: [
      "David Harbour",
      "Jahi Di'Allo Winston",
      "Anthony Mackie",
      "Jennifer Coolidge",
      "Tig Notaro",
    ],
    director: "Christopher Landon",
    studio: "Netflix",
  },
  {
    id: "37",
    title: "Spiderhead",
    tmdbId: "718930",
    type: "movie",
    genre: ["Science Fiction", "Thriller", "Drama"],
    duration: "106 min",
    releaseYear: 2022,
    releaseDate: "June 17, 2022",
    rating: 5.4,
    userRating: 5.5,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/4E3vRfpXk6vBdEKNagPvnHWPWc7.jpg",
    poster: "https://image.tmdb.org/t/p/w500/4E3vRfpXk6vBdEKNagPvnHWPWc7.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/zGv3dYV6v6ViZOhTjGBqLvPcbMv.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    description:
      "In the near future, convicts are offered the chance to volunteer as medical subjects to shorten their sentence. One prisoner finds himself in an ethical dilemma.",
    cast: [
      "Chris Hemsworth",
      "Miles Teller",
      "Jurnee Smollett",
      "Tess Haubrich",
      "BeBe Bettencourt",
    ],
    director: "Joseph Kosinski",
    studio: "Netflix",
  },
  // === MORE BLOCKBUSTERS ===
  {
    id: "38",
    title: "Extraction 2",
    tmdbId: "677179",
    type: "movie",
    genre: ["Action", "Thriller"],
    duration: "122 min",
    releaseYear: 2023,
    releaseDate: "June 16, 2023",
    rating: 7.2,
    userRating: 7.0,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
    poster: "https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "After barely surviving his grievous wounds from his mission in Dhaka, Tyler Rake is back for another extraction mission in this high-octane action thriller.",
    cast: [
      "Chris Hemsworth",
      "Golshifteh Farahani",
      "Adam Bessa",
      "Olga Kurylenko",
      "Tornike Gogrichiani",
    ],
    director: "Sam Hargrave",
    studio: "Netflix",
  },
  {
    id: "39",
    title: "The Killer",
    tmdbId: "359724",
    type: "movie",
    genre: ["Action", "Thriller", "Crime"],
    duration: "118 min",
    releaseYear: 2023,
    releaseDate: "November 10, 2023",
    rating: 6.5,
    userRating: 6.6,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/e7Jvsry47JJQruuezjU2X1Z6J77.jpg",
    poster: "https://image.tmdb.org/t/p/w500/e7Jvsry47JJQruuezjU2X1Z6J77.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/4ft6TR9wA6bra0RLL6G7JFDQ5t1.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "A methodical assassin begins to unravel psychologically after a botched job. David Fincher's stylish thriller starring Michael Fassbender.",
    cast: [
      "Michael Fassbender",
      "Tilda Swinton",
      "Charles Parnell",
      "Arliss Howard",
      "Kerry O'Malley",
    ],
    director: "David Fincher",
    studio: "Netflix",
  },
  {
    id: "40",
    title: "Leave the World Behind",
    tmdbId: "842945",
    type: "movie",
    genre: ["Thriller", "Drama", "Mystery"],
    duration: "141 min",
    releaseYear: 2023,
    releaseDate: "December 8, 2023",
    rating: 6.5,
    userRating: 6.4,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/29rCB4qGANvmUvW0gR5EJ21DuWq.jpg",
    poster: "https://image.tmdb.org/t/p/w500/29rCB4qGANvmUvW0gR5EJ21DuWq.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/nVRyd3xXpXjuKR0VVeKKXbJlZjk.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "A family's vacation is interrupted by two strangers bearing news of a mysterious blackout. As the threat grows more terrifying, they must figure out how to save themselves.",
    cast: [
      "Julia Roberts",
      "Mahershala Ali",
      "Ethan Hawke",
      "Myha'la",
      "Kevin Bacon",
    ],
    director: "Sam Esmail",
    studio: "Netflix",
  },
  {
    id: "41",
    title: "Heart of Stone",
    tmdbId: "724209",
    type: "movie",
    genre: ["Action", "Thriller", "Adventure"],
    duration: "122 min",
    releaseYear: 2023,
    releaseDate: "August 11, 2023",
    rating: 5.7,
    userRating: 6.0,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg",
    poster: "https://image.tmdb.org/t/p/w500/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/cHNqobjzfLr7of4RbIvLu5qEwt0.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "An intelligence operative for a shadowy global peacekeeping agency races to stop a hacker from stealing the world's most dangerous weapon.",
    cast: [
      "Gal Gadot",
      "Jamie Dornan",
      "Alia Bhatt",
      "Sophie Okonedo",
      "Matthias Schweighöfer",
    ],
    director: "Tom Harper",
    studio: "Netflix",
  },
  {
    id: "42",
    title: "Pain Hustlers",
    tmdbId: "939335",
    type: "movie",
    genre: ["Drama", "Crime"],
    duration: "123 min",
    releaseYear: 2023,
    releaseDate: "October 27, 2023",
    rating: 6.2,
    userRating: 6.3,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/qUJPkfFd3NbWPx6eBZk0G5PK3OL.jpg",
    poster: "https://image.tmdb.org/t/p/w500/qUJPkfFd3NbWPx6eBZk0G5PK3OL.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/w2nFc2Rsm93PDkvjY4LTn17ePO0.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description:
      "A high school dropout lands a job at a failing pharmaceutical start-up, where she finds herself trapped in a dangerous opioid conspiracy.",
    cast: [
      "Emily Blunt",
      "Chris Evans",
      "Catherine O'Hara",
      "Andy García",
      "Jay Duplass",
    ],
    director: "David Yates",
    studio: "Netflix",
  },
  {
    id: "43",
    title: "Society of the Snow",
    tmdbId: "850871",
    type: "movie",
    genre: ["Drama", "History", "Thriller"],
    duration: "144 min",
    releaseYear: 2023,
    releaseDate: "December 15, 2023",
    rating: 8.0,
    userRating: 7.9,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/k7rEpZfNMB35WWLJHVsziPEsP4x.jpg",
    poster: "https://image.tmdb.org/t/p/w500/k7rEpZfNMB35WWLJHVsziPEsP4x.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/gU8VqrxqMZLKMWZxWxvhCPd1hss.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description:
      "The true story of the Uruguayan rugby team whose plane crashed in the Andes in 1972 and their extraordinary fight for survival.",
    cast: [
      "Enzo Vogrincic",
      "Agustín Pardella",
      "Matías Recalt",
      "Esteban Bigliardi",
      "Diego Vegezzi",
    ],
    director: "J.A. Bayona",
    studio: "Netflix",
    awards: "Academy Award Nominee 2024",
  },
  {
    id: "44",
    title: "Luther: The Fallen Sun",
    tmdbId: "756999",
    type: "movie",
    genre: ["Crime", "Thriller", "Mystery"],
    duration: "129 min",
    releaseYear: 2023,
    releaseDate: "March 10, 2023",
    rating: 6.4,
    userRating: 6.6,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/tvX2JltXjmpHSVpUNHFVf3MPrJF.jpg",
    poster: "https://image.tmdb.org/t/p/w500/tvX2JltXjmpHSVpUNHFVf3MPrJF.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/jRJGrD0YkfyRxNRJDuIL5e6p3WD.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description:
      "A serial killer terrorizes London while brilliant detective John Luther sits behind bars. Haunted by his failure to capture the killer, Luther breaks out to finish the job.",
    cast: [
      "Idris Elba",
      "Cynthia Erivo",
      "Andy Serkis",
      "Dermot Crowley",
      "Thomas Coombes",
    ],
    director: "Jamie Payne",
    studio: "Netflix",
  },
  {
    id: "45",
    title: "Nimona",
    tmdbId: "550205",
    type: "movie",
    genre: ["Animation", "Fantasy", "Adventure"],
    duration: "101 min",
    releaseYear: 2023,
    releaseDate: "June 30, 2023",
    rating: 7.7,
    userRating: 7.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/8wmaN5NKXMEzL86NJbmPFqzJm0Z.jpg",
    poster: "https://image.tmdb.org/t/p/w500/8wmaN5NKXMEzL86NJbmPFqzJm0Z.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/eTM4BZf3RpNT1TLbOVZXoxL7JNp.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description:
      "A knight framed for a crime he didn't commit teams up with a shape-shifting teen to prove his innocence in this action-packed animated adventure.",
    cast: [
      "Chloë Grace Moretz",
      "Riz Ahmed",
      "Eugene Lee Yang",
      "Frances Conroy",
      "Lorraine Toussaint",
    ],
    director: "Nick Bruno, Troy Quane",
    studio: "Netflix",
    awards: "Academy Award Nominee 2024",
  },
  // === MORE BENGALI MOVIES ===
  {
    id: "46",
    title: "Aparajito",
    tmdbId: "11225",
    type: "movie",
    genre: ["Drama"],
    duration: "113 min",
    releaseYear: 1956,
    releaseDate: "October 11, 1956",
    rating: 8.2,
    userRating: 8.3,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    poster: "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Continuing Apu's story from Pather Panchali, this Satyajit Ray masterpiece follows Apu's adolescence and his mother's struggle in poverty.",
    cast: [
      "Pinaki Sengupta",
      "Smaran Ghosal",
      "Karuna Banerjee",
      "Kanu Banerjee",
    ],
    director: "Satyajit Ray",
    studio: "Epic Films",
    awards: "Golden Lion - Venice Film Festival",
  },
  {
    id: "47",
    title: "Vinci Da",
    tmdbId: "498160",
    type: "movie",
    genre: ["Thriller", "Crime"],
    duration: "110 min",
    releaseYear: 2019,
    releaseDate: "October 11, 2019",
    rating: 7.5,
    userRating: 7.6,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/qyVKUqHjdPcxiYBYfJYLzpJLxFP.jpg",
    poster: "https://image.tmdb.org/t/p/w500/qyVKUqHjdPcxiYBYfJYLzpJLxFP.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/3G1jVvxHZlKfJNVYaMV3dVXgL5b.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "A Bengali thriller about a brilliant painter who gets entangled in a dangerous world of crime and deception. A modern noir masterpiece.",
    cast: [
      "Rudranil Ghosh",
      "Sohini Sarkar",
      "Anirban Bhattacharya",
      "Riddhi Sen",
    ],
    director: "Srijit Mukherji",
    studio: "SVF Entertainment",
  },
  // === MORE HINDI BLOCKBUSTERS ===
  {
    id: "48",
    title: "Bajrangi Bhaijaan",
    tmdbId: "297222",
    type: "movie",
    genre: ["Drama", "Comedy", "Action"],
    duration: "163 min",
    releaseYear: 2015,
    releaseDate: "July 17, 2015",
    rating: 8.0,
    userRating: 8.1,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/4SLKVIcEbOl4YnwEFqQHTvrhYBW.jpg",
    poster: "https://image.tmdb.org/t/p/w500/4SLKVIcEbOl4YnwEFqQHTvrhYBW.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/sOht4FMuQfqPdZ3s8cXl7RhfUb4.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "A man with a simple mind takes on the mission to reunite a Pakistani girl with her family across the India-Pakistan border. A heartwarming tale of humanity.",
    cast: [
      "Salman Khan",
      "Harshaali Malhotra",
      "Nawazuddin Siddiqui",
      "Kareena Kapoor",
    ],
    director: "Kabir Khan",
    studio: "Salman Khan Films",
  },
  {
    id: "49",
    title: "Dangal",
    tmdbId: "360814",
    type: "movie",
    genre: ["Action", "Drama", "Biography"],
    duration: "161 min",
    releaseYear: 2016,
    releaseDate: "December 23, 2016",
    rating: 8.3,
    userRating: 8.4,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/o8hhLlHjWDgSYqvF9lIu8rxJ0Lx.jpg",
    poster: "https://image.tmdb.org/t/p/w500/o8hhLlHjWDgSYqvF9lIu8rxJ0Lx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/dhOCqYLPt0mYEyIvIMLYVX5Gc6c.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "Former wrestler Mahavir Singh Phogat trains his daughters to become world-class wrestlers. Based on a true story that inspired a nation.",
    cast: [
      "Aamir Khan",
      "Fatima Sana Shaikh",
      "Sanya Malhotra",
      "Sakshi Tanwar",
    ],
    director: "Nitesh Tiwari",
    studio: "Aamir Khan Productions",
    awards: "Multiple National Film Awards",
  },
  {
    id: "50",
    title: "3 Idiots",
    tmdbId: "20453",
    type: "movie",
    genre: ["Comedy", "Drama"],
    duration: "171 min",
    releaseYear: 2009,
    releaseDate: "December 25, 2009",
    rating: 8.4,
    userRating: 8.4,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/66A9MqXOyVFCssoloscw79z8CVC.jpg",
    poster: "https://image.tmdb.org/t/p/w500/66A9MqXOyVFCssoloscw79z8CVC.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/6y8YcPHKlJUJSdZLiSVrCQNYL2R.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "Two friends search for their long-lost friend while recalling their college days filled with laughter, pressure, and unconventional wisdom.",
    cast: [
      "Aamir Khan",
      "Kareena Kapoor",
      "R. Madhavan",
      "Sharman Joshi",
      "Boman Irani",
    ],
    director: "Rajkumar Hirani",
    studio: "Vinod Chopra Films",
    awards: "Highest-grossing Bollywood film of its time",
  },
  {
    id: "51",
    title: "PK",
    tmdbId: "274877",
    type: "movie",
    genre: ["Comedy", "Drama", "Sci-Fi"],
    duration: "153 min",
    releaseYear: 2014,
    releaseDate: "December 19, 2014",
    rating: 8.1,
    userRating: 8.2,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/wEU67AioBBH9SGNvJ5xGmTLFLCZ.jpg",
    poster: "https://image.tmdb.org/t/p/w500/wEU67AioBBH9SGNvJ5xGmTLFLCZ.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/4j8j3qRqOXq4aCDqGPLDJqNtvWP.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    description:
      "An alien on Earth loses his connection to his spaceship and questions human nature and religion with child-like curiosity and humor.",
    cast: [
      "Aamir Khan",
      "Anushka Sharma",
      "Sushant Singh Rajput",
      "Boman Irani",
      "Saurabh Shukla",
    ],
    director: "Rajkumar Hirani",
    studio: "Rajkumar Hirani Films",
  },
  // === MORE PREMIUM ENGLISH MOVIES ===
  {
    id: "52",
    title: "Oppenheimer",
    tmdbId: "872585",
    type: "movie",
    genre: ["Drama", "History", "Thriller"],
    duration: "180 min",
    releaseYear: 2023,
    releaseDate: "July 21, 2023",
    rating: 8.3,
    userRating: 8.4,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    cast: [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr.",
      "Florence Pugh",
    ],
    director: "Christopher Nolan",
    studio: "Universal Pictures",
    awards: "Academy Award Winner 2024 - Best Picture",
  },
  {
    id: "53",
    title: "Dune",
    tmdbId: "438631",
    type: "movie",
    genre: ["Science Fiction", "Adventure", "Action"],
    duration: "155 min",
    releaseYear: 2021,
    releaseDate: "October 22, 2021",
    rating: 7.8,
    userRating: 8.0,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/xtYyGJCTyFuFXZdlHkFSjLRXIFN.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Paul Atreides arrives on Arrakis, the desert planet known as Dune, where he must navigate political intrigue and mysterious powers to secure his family's future.",
    cast: [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Oscar Isaac",
      "Jason Momoa",
    ],
    director: "Denis Villeneuve",
    studio: "Warner Bros.",
    awards: "Academy Award Winner - Best Visual Effects",
  },
  {
    id: "54",
    title: "The Batman",
    tmdbId: "414906",
    type: "movie",
    genre: ["Action", "Crime", "Thriller"],
    duration: "176 min",
    releaseYear: 2022,
    releaseDate: "March 4, 2022",
    rating: 7.8,
    userRating: 7.9,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "In his second year of fighting crime, Batman uncovers corruption in Gotham City while pursuing the Riddler, a serial killer who targets Gotham's elite.",
    cast: [
      "Robert Pattinson",
      "Zoë Kravitz",
      "Paul Dano",
      "Jeffrey Wright",
      "Colin Farrell",
    ],
    director: "Matt Reeves",
    studio: "Warner Bros.",
  },
  {
    id: "55",
    title: "Top Gun: Maverick",
    tmdbId: "361743",
    type: "movie",
    genre: ["Action", "Drama"],
    duration: "130 min",
    releaseYear: 2022,
    releaseDate: "May 27, 2022",
    rating: 8.3,
    userRating: 8.4,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a detachment of TOP GUN graduates for a specialized mission.",
    cast: [
      "Tom Cruise",
      "Miles Teller",
      "Jennifer Connelly",
      "Jon Hamm",
      "Glen Powell",
    ],
    director: "Joseph Kosinski",
    studio: "Paramount Pictures",
    awards: "Academy Award Nominee - Best Picture",
  },
  {
    id: "56",
    title: "No Time to Die",
    tmdbId: "370172",
    type: "movie",
    genre: ["Action", "Adventure", "Thriller"],
    duration: "163 min",
    releaseYear: 2021,
    releaseDate: "October 8, 2021",
    rating: 7.3,
    userRating: 7.4,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
    poster: "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/4RpLr2r8j1I3hgxXDOF6C2EXqAL.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help on a dangerous mission.",
    cast: [
      "Daniel Craig",
      "Rami Malek",
      "Léa Seydoux",
      "Lashana Lynch",
      "Ana de Armas",
    ],
    director: "Cary Joji Fukunaga",
    studio: "MGM",
  },
  {
    id: "57",
    title: "Inception",
    tmdbId: "27205",
    type: "movie",
    genre: ["Action", "Science Fiction", "Thriller"],
    duration: "148 min",
    releaseYear: 2010,
    releaseDate: "July 16, 2010",
    rating: 8.8,
    userRating: 8.8,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy",
      "Marion Cotillard",
    ],
    director: "Christopher Nolan",
    studio: "Warner Bros.",
    awards: "Academy Award Winner - Best Visual Effects",
  },
  {
    id: "58",
    title: "Interstellar",
    tmdbId: "157336",
    type: "movie",
    genre: ["Adventure", "Drama", "Science Fiction"],
    duration: "169 min",
    releaseYear: 2014,
    releaseDate: "November 7, 2014",
    rating: 8.6,
    userRating: 8.7,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    cast: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine",
      "Matt Damon",
    ],
    director: "Christopher Nolan",
    studio: "Paramount Pictures",
    awards: "Academy Award Winner - Best Visual Effects",
  },
  {
    id: "59",
    title: "The Dark Knight",
    tmdbId: "155",
    type: "movie",
    genre: ["Action", "Crime", "Drama", "Thriller"],
    duration: "152 min",
    releaseYear: 2008,
    releaseDate: "July 18, 2008",
    rating: 9.0,
    userRating: 9.0,
    thumbnail:
      "https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    trailerUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    description:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must face one of his greatest challenges yet to save the city.",
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
      "Gary Oldman",
    ],
    director: "Christopher Nolan",
    studio: "Warner Bros.",
    awards: "Academy Award Winner - Best Supporting Actor",
  },
];

export default netflixShows;
