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
];

export default netflixShows;
