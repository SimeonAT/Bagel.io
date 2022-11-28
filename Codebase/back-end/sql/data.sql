INSERT INTO foobar(thetime) VALUES (current_timestamp);

INSERT INTO member(username, email, memberpassword) VALUES ('collin', 'collin@ucsc.edu', 'testpass1');
INSERT INTO member(username, email, memberpassword) VALUES ('Vlad', 'vlad@ucsc.edu', 'testpass2');
INSERT INTO member(username, email, memberpassword) VALUES ('kalani', 'kalani@ucsc.edu', 'testpass3');
INSERT INTO member(username, email, memberpassword) VALUES ('gene', 'gene@ucsc.edu', 'testpass4');
INSERT INTO member(username, email, memberpassword) VALUES ('simeon', 'simeontran@gmail.com', 'simeontran');

INSERT INTO taskpreset(taskname, presetid, tasktag, username) VALUES ('Make Dinner', '021a7a21-e6ce-449b-b95d-f4bb2cb5b4a7', 'cooking', 'collin');

INSERT INTO taskscheduled(starttime, scheduledid, endtime, complete, checkedin, presetid) VALUES ('2021-11-03T02:44:18Z', 'cb81de43-87f6-482e-b109-7b46e76b830e', '2021-11-03T08:44:18Z', 'false', 'false', '021a7a21-e6ce-449b-b95d-f4bb2cb5b4a7');
