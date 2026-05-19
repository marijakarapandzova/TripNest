-- Insert NEW Hosts
INSERT INTO hosts(created_at, updated_at, name, surname, country_id)
SELECT
  now(), now(),
  data.name, data.surname, countries.id
FROM (
  VALUES
    ('Alex', 'Stone', 'Macedonia'),
    ('Liam', 'Walker', 'United States of America'),
    ('Noah', 'Smith', 'United Kingdom'),
    ('Oliver', 'Brown', 'Australia'),
    ('Ethan', 'Davis', 'Argentina'),
    ('Lucas', 'Miller', 'Japan'),
    ('Mason', 'Wilson', 'Germany'),
    ('Logan', 'Taylor', 'Canada')
) AS data(name, surname, country_name)
JOIN countries ON countries.name = data.country_name;

-- Insert NEW Accommodations
INSERT INTO accommodations(created_at, updated_at, name, category, host_id, condition, num_rooms, rented)
VALUES
    (now(), now(), 'Skyline Haven', 'HOUSE', 1, 'GOOD', 4, false),
    (now(), now(), 'Ocean Breeze Motel', 'MOTEL', 2, 'BAD', 10, true),
    (now(), now(), 'Forest View Lodge', 'HOTEL', 3, 'GOOD', 30, false),
    (now(), now(), 'Mountain Edge Room', 'ROOM', 4, 'GOOD', 2, false),
    (now(), now(), 'Sunset Valley Flat', 'FLAT', 5, 'BAD', 2, false),
    (now(), now(), 'Golden Horizon Stay', 'ROOM', 6, 'GOOD', 2, true),
    (now(), now(), 'Urban Nest House', 'HOUSE', 7, 'BAD', 3, false),
    (now(), now(), 'Crystal Bay Apartment', 'APARTMENT', 8, 'GOOD', 3, true);
