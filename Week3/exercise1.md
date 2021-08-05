1. What columns violate 1NF?
- Columns food_code and food_description violate (All data must be atomic).
- No primary key applied.
- dinner_date is not the same type of data;

2. What entities do you recognize that could be extracted?
- Member entity, Dinner entity, Food entity, and Venue entity.

3. Name all the tables and columns that would make a 3NF compliant solution.
- member(member_id PRIMARY KEY, member_name, member_address)
- dinner(dinner_id PRIMARY KEY, dinner_date)
- food(food_code PRIMARY KEY, food_description)
- dinner_food_junction(dinner_id FOREIGN KEY REFERENCES dinner(dinner_id), food_code FOREIGN KEY REFERENCES food(food_code))
- venue(venue_code PRIMARY KEY, venue description);
- member_dinner_venue_junction(member_id FOREIGN KEY REFERENCES member(member_id), dinner_id FOREIGN KEY REFERENCES dinner(dinner_id), venue_code FOREIGN KEY REFERENCES venue(venue_code), PRIMARY KEY (member_id, dinner_id))