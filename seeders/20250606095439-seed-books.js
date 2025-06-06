'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('books', [
      {
        title: 'To Kill a Mockingbird',
        description: 'A gripping tale of racial injustice and childhood innocence in 1930s Alabama, following Scout Finch as her father defends a Black man falsely accused of rape.',
        published_date: new Date('1960-07-11'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: '1984',
        description: 'A dystopian masterpiece depicting a totalitarian society where Big Brother watches everything and truth is whatever the Party says it is.',
        published_date: new Date('1949-06-08'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Pride and Prejudice',
        description: 'A witty romantic novel following Elizabeth Bennet as she navigates love, family, and social expectations in Georgian England.',
        published_date: new Date('1813-01-28'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Great Gatsby',
        description: 'A tragic story of love, wealth, and the American Dream set in the Jazz Age, narrated by Nick Carraway about his mysterious neighbor Jay Gatsby.',
        published_date: new Date('1925-04-10'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Harry Potter and the Philosopher\'s Stone',
        description: 'The magical beginning of Harry Potter\'s journey as he discovers he\'s a wizard and enters Hogwarts School of Witchcraft and Wizardry.',
        published_date: new Date('1997-06-26'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        description: 'The epic fantasy adventure begins as Frodo Baggins inherits a powerful ring and must journey to destroy it before the Dark Lord Sauron reclaims it.',
        published_date: new Date('1954-07-29'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Catcher in the Rye',
        description: 'A coming-of-age story following Holden Caulfield, a disaffected teenager wandering New York City after being expelled from prep school.',
        published_date: new Date('1951-07-16'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Jane Eyre',
        description: 'A Gothic romance following the orphaned Jane Eyre from her troubled childhood to her complex relationship with the brooding Mr. Rochester.',
        published_date: new Date('1847-10-16'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Handmaid\'s Tale',
        description: 'A chilling dystopian novel set in a totalitarian society where women are subjugated and forced into reproductive servitude.',
        published_date: new Date('1985-08-17'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Dune',
        description: 'A science fiction epic set on the desert planet Arrakis, following Paul Atreides as he navigates political intrigue and mystical powers.',
        published_date: new Date('1965-08-01'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Hobbit',
        description: 'A whimsical adventure following Bilbo Baggins as he joins a company of dwarves on a quest to reclaim their homeland from the dragon Smaug.',
        published_date: new Date('1937-09-21'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Brave New World',
        description: 'A dystopian vision of a future society controlled through technology, conditioning, and the drug soma, questioning the cost of stability and happiness.',
        published_date: new Date('1932-08-30'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
        description: 'Four children discover a magical world through a wardrobe, where they must help Aslan defeat the White Witch and restore spring to Narnia.',
        published_date: new Date('1950-10-16'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'One Hundred Years of Solitude',
        description: 'A multi-generational saga of the Buendía family in the fictional town of Macondo, blending magical realism with Latin American history.',
        published_date: new Date('1967-06-05'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Kite Runner',
        description: 'A powerful story of friendship, guilt, and redemption set against the backdrop of Afghanistan\'s tumultuous history.',
        published_date: new Date('2003-05-29'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Animal Farm',
        description: 'An allegorical novella about farm animals who rebel against their human farmer, hoping to create equality but finding corruption instead.',
        published_date: new Date('1945-08-17'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Alchemist',
        description: 'A philosophical novel about Santiago, a young shepherd who travels from Spain to Egypt in search of treasure, discovering life\'s greatest lessons along the way.',
        published_date: new Date('1988-01-01'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Gone Girl',
        description: 'A psychological thriller about the disappearance of Amy Dunne and the suspicion that falls on her husband Nick, revealing dark secrets about their marriage.',
        published_date: new Date('2012-06-05'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'The Book Thief',
        description: 'Set in Nazi Germany, this novel follows Liesel Meminger, a young girl who steals books and shares them during the horrors of World War II.',
        published_date: new Date('2005-09-01'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'Fahrenheit 451',
        description: 'A dystopian novel about a future society where books are banned and "firemen" burn any that are found, following one fireman\'s awakening to the value of literature.',
        published_date: new Date('1953-10-19'),
        author_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('books', null, {});
  }
};

