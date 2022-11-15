const events = [
    {
        "id" : 1, 
        "name": "Lazer Maze",
        "desc": "Maze created using lazers.",
        "isTeam": 1,
        "faculty_coordinator": "Dr. Amit Mondal",
        "student_coordinators": "Bilal | Joravar",
        "room": "B301",
        "day1": "16th : 11:00 am - 3:00 pm & 6:30 pm - 8:30 pm",
        "day2": "17th : 10:00 am - 1:00 pm",
        "judging_criteria": "Time",
        "src" : "/css/posters/Lazer_maze.gif"
    },
    {
        "id" : 2, 
        "name": "Electrothon",
        "desc": "Three mini games - buzzwire, japanese electronic game and carnival shooting game. Arduino circuit building.",
        "isTeam": 1,
        "faculty_coordinator": "Dr. Ravishankar Dudhe",
        "student_coordinators": "Silah | Rayyan",
        "room": "B309",
        "day1": "16th : 2:30 pm - 5:00 pm ",
        "day2": "17th : 10:00 am - 3:00 pm",
        "judging_criteria": "Time",
        "src" : "/css/posters/Electrothon.gif"
    },
    {
        "id" : 3, 
        "name": "Neon TechnoFun",
        "desc": "A Soccer game with RC cars.",
        "isTeam": 4,
        "faculty_coordinator": "Dr. Ravishankar Dudhe",
        "student_coordinators": "Noel | Karan",
        "room": "B311",
        "day1": "16th : 3:00 pm - 6:00 pm",
        "day2": "17th : 10:00 am - 3:00 pm",
        "judging_criteria": "Goals",
        "src" : "/css/posters/Neon_Rocket.png"
    },
    {
        "id" : 4, 
        "name": "Hydrojet",
        "desc": "Make a launch platform and launch a rocket using water bottles, propelled by pressurised water.",
        "isTeam": 1,
        "faculty_coordinator": "Sampath Suranjan",
        "student_coordinators": "Ahmed Fazal | Raj P",
        "room": "Hostel court",
        "day1": "17th : 10:30 am - 1:30 pm",
        "day2": "",
        "judging_criteria": "Flight Time and Distance",
        "src" : "/css/posters/HYDROJET.jpeg"
    },
    {
        "id" : 5, 
        "name": "Homeprotek",
        "desc": "Each team will be supplied with basic requirements for building the home structure they will also be supplied with a list of items that is supplied extra tools for building in the market which will  be charged (game credit). The winners will be judged on the basis of the house that is build with best ventilation, good asthetics, stability and the least budgeting possible",
        "isTeam": 4,
        "faculty_coordinator": "Sampath Suranjan",
        "student_coordinators": "Krishna Prasad | Pratyush",
        "room": "B411, B405",
        "day1": "16th : 10:30 am - 1:00 pm",
        "day2": "",
        "judging_criteria": "Temperature, Asthetics, Rigidity, Materials used",
        "src" : "/css/posters/HOMEPROTEK.jpeg"
    },
    {
        "id" : 6, 
        "name": "SniffLicious",
        "desc": "Make a perfume on the spot.",
        "isTeam": 1,
        "faculty_coordinator": "Vandana S",
        "student_coordinators": "Wendell Paul | Reihan Mujeeb",
        "room": "B302",
        "day1": "16th : 9:00 am - 2:00 pm",
        "day2": "17th : 9:00 am - 2:00 pm",
        "judging_criteria": "N/A",
        "src" : "/css/posters/Snifflicious.jpeg"
    },
    {
        "id" : 7, 
        "name": "Escape Room",
        "desc": "Are you ready for an adventure of thrill and fear? Are you a fan of stranger things? The department of civil engineering presents you the most exciting puzzles of all times - “Escape Room” based on award winning show “Stranger Things”. Full of twists, turns and most importantly teamwork. Be the ultimate winner in 10 minutes, Where nobody gets out without having fun.",
        "isTeam": 2,
        "faculty_coordinator": "Surumi R",
        "student_coordinators": "Sara Biji | Huda",
        "room": "B105",
        "day1": "16th : 9:00 am - 5:00 pm",
        "day2": "17th : 9:00 am - 5:00 pm",
        "judging_criteria": "Time",
        "src" : "/css/posters/Escape_Room.png"
    },
    {
        "id" : 8, 
        "name": "Lost Treasure",
        "desc": `Nothing’s lost forever. <br><br>
        The Department of Civil Engineering brings to you “Lost Treasure” A game in which each team will surely be the winner. Make your attempt to be the first in finding something that has been hidden, using written directions or clues. Can you navigate? Will you be able to look beyond what meets the eye? Only one way to find out!`,
        "isTeam": 4,
        "faculty_coordinator": "Deepa Varghese",
        "student_coordinators": "Basit | Aejaz",
        "room": "B103",
        "day1": "16th : 9:00 am - 5:00 pm",
        "day2": "17th : 9:00 am - 5:00 pm",
        "judging_criteria": "Time",
        "src" : "/css/posters/Lost_Treasure.png"
    },
    {
        "id" : 9, 
        "name": "Skedaddle Through Time",
        "desc": `First part - Game title: Mysteries of Anubis
        First game: Cyphers solving hard riddles about 2-3 (8 people this side - team 1)
        Second game: Sherlock Holmes solving puzzles/mysteries around 1-6+ (8 other people this side - team 2)
        <br><br>
        Second part: Creed: Rise to Glory - a virtual reality boxing video game, released in 2018
        Gives an immense cinematic experience of real life boxing 
        Is played with PS4 with PSVR and 2 motion controllers to provide a physical experience.
        <br><br> 
        Final part: Among Us is a party game for 7 - 10 players. Players are divided into 2 teams, Crew-mates and Impostors. The goal of the Crew-mates is to complete tasks to maintain and fix the spaceship, while the Impostor's goal is to sabotage the entire mission before the task gauge fills up. Players will discuss amongst each other, vote for suspicious players and eject them out into the cold abyss of space. Crew-mates can also win by ejecting all Impostors.`,
        "isTeam": 5,
        "faculty_coordinator": "Shoba Francis",
        "student_coordinators": "Sanchita | Astha | Hashim | Dhruv",
        "room": "AutoCAD Lab",
        "day1": "16th : 10:00 am - 3:30 pm",
        "day2": "",
        "judging_criteria": "Finding the Imposter",
        "src" : "/css/posters/Skedaddle_through_time_2.jpg"
        
    }
    
];