SELECT u.id, u.name, t.seat_number
FROM tickets t
JOIN users u ON t.user = u.id
WHERE t.train = 11
ORDER BY t.seat_number ASC;

SELECT u.id, u.name, 
       COUNT(DISTINCT tickets.train) AS trains_count, 
       SUM(trains.distance) / 10.0 AS total_distance
FROM tickets
JOIN users u ON tickets.user = u.id
JOIN trains ON tickets.train = trains.id
GROUP BY u.id, u.name
ORDER BY total_distance DESC
LIMIT 6;


SELECT tr.id, ty.name AS type, s1.name AS src_stn, s2.name AS dst_stn, TIMEDIFF(tr.arrival, tr.departure) AS travel_time
FROM trains tr
JOIN types ty ON tr.type = ty.id
JOIN stations s1 ON tr.source = s1.id
JOIN stations s2 ON tr.destination = s2.id
ORDER BY travel_time DESC
LIMIT 6;

SELECT ty.name AS type, s1.name AS src_stn, s2.name AS dst_stn, 
       tr.departure, tr.arrival,
       ROUND(ty.fare_rate * tr.distance / 1000.0) AS fare
FROM trains tr
JOIN types ty ON tr.type = ty.id
JOIN stations s1 ON tr.source = s1.id
JOIN stations s2 ON tr.destination = s2.id
ORDER BY tr.departure ASC;

SELECT tr.id, ty.name AS type, s1.name AS src_stn, s2.name AS dst_stn, 
       COUNT(t.id) AS occupied, ty.max_seats AS maximum
FROM trains tr
JOIN types ty ON tr.type = ty.id
JOIN stations s1 ON tr.source = s1.id
JOIN stations s2 ON tr.destination = s2.id
JOIN tickets t ON t.train = tr.id
GROUP BY tr.id, ty.name, s1.name, s2.name, ty.max_seats
ORDER BY tr.id ASC;

SELECT tr.id, ty.name AS type, s1.name AS src_stn, s2.name AS dst_stn, 
       COUNT(t.id) AS occupied, ty.max_seats AS maximum
FROM trains tr
JOIN types ty ON tr.type = ty.id
JOIN stations s1 ON tr.source = s1.id
JOIN stations s2 ON tr.destination = s2.id
LEFT JOIN tickets t ON t.train = tr.id
GROUP BY tr.id, ty.name, s1.name, s2.name, ty.max_seats
ORDER BY tr.id ASC;
