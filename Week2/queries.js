

module.exports = {
    ex1: [
        {Q1: 'CREATE TABLE authors(author_no INT PRIMARY KEY, author_name VARCHAR(50), university VARCHAR(50), date_of_birth DATE, h_index INT, gender VARCHAR(10));'},
        {Q2: 'ALTER TABLE authors ADD mentor INT, ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no);'},
    ],
    
    ex2: [

        {Q1: 'CREATE TABLE research_Papers(paper_id INT PRIMARY KEY, paper_title VARCHAR(256), conference VARCHAR(150), publish_date DATE);'},
        /* relationship between Authors and Research papers is many to many */
        {Q2: 'CREATE TABLE authors_papers_junction(id INT PRIMARY KEY AUTO_INCREMENT, author_no INT NOT NULL, paper_no INT NOT NULL, UNIQUE(author_no, paper_no), FOREIGN KEY(author_no) REFERENCES authors(author_no), FOREIGN KEY(paper_no) REFERENCES research_Papers(paper_id));'},
        {Q3: ['INSERT INTO authors VALUES ?', 'INSERT INTO research_Papers VALUES ?', 'INSERT INTO authors_papers_junction(author_no, paper_no) VALUES ?']},
    ],

    ex3: [

        {Q1: 'SELECT ath.author_name author, mnt.author_name mentor FROM authors ath LEFT JOIN authors mnt ON ath.mentor=mnt.author_no;'},
        {Q2: 'SELECT authors.author_no, author_name, university, date_of_birth, h_index, gender, mentor, paper_title FROM authors LEFT JOIN authors_papers_junction apj ON authors.author_no=apj.author_no LEFT JOIN research_Papers ON paper_no=paper_id;'},

    ],
    
    ex4: [

        {Q1:'SELECT paper_title, COUNT(author_no) number_of_authors FROM research_Papers JOIN authors_papers_junction ON paper_id=paper_no GROUP BY paper_title;'},
        {Q2:`SELECT COUNT(DISTINCT(paper_no)) papers_by_female FROM authors_papers_junction apj JOIN authors ON apj.author_no=authors.author_no WHERE gender='F';`},
        {Q3: 'SELECT university, AVG(h_index) h_index_average FROM authors GROUP BY university;'},
        {Q4: 'SELECT university, COUNT(DISTINCT(paper_no)) papers_total FROM authors, authors_papers_junction apj WHERE authors.author_no=apj.author_no GROUP BY university;'},
        {Q5:'SELECT university, MIN(h_index) min_h_index, MAX(h_index) max_h_index FROM authors GROUP BY university;'}

    ]
}