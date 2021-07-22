module.exports = [
    {q1: 'SELECT Name FROM country WHERE Population > 8000000;'},
    {q2: `SELECT Name FROM country WHERE Name like '%land%';`},
    /* if 500000 and 1million is not included we can use SELECT Name FROM city WHERE Population > 500000 AND Population < 1000000;*/
    {q3: 'SELECT Name FROM city WHERE Population BETWEEN  500000 AND 1000000;'},
    {q4: `SELECT Name FROM country WHERE Continent='Europe';`},
    {q5: 'SELECT * FROM country ORDER BY SurfaceArea DESC;'},
    {q6: `SELECT Name FROM city WHERE CountryCode='NLD';`},
    {q7: `SELECT Population Rotterdam_Population FROM city WHERE Name='Rotterdam';`},
    {q8: 'SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10;'},
    {q9: 'SELECT * FROM city ORDER BY Population  DESC LIMIT 10;'},
    {q10: 'SELECT SUM(Population) World_Population FROM country;'},
]