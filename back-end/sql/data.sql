INSERT INTO foobar(thetime) VALUES (current_timestamp);

INSERT INTO member(username, email, memberpassword) VALUES ('collin', 'collin@ucsc.edu', 'testpass1');
INSERT INTO member(username, email, memberpassword) VALUES ('vlad', 'vlad@ucsc.edu', 'testpass2');
INSERT INTO member(username, email, memberpassword) VALUES ('kalani', 'kalani@ucsc.edu', 'testpass3');
INSERT INTO member(username, email, memberpassword) VALUES ('gene', 'gene@ucsc.edu', 'testpass4');
INSERT INTO member(username, email, memberpassword) VALUES ('simeon', 'simeon@ucsc.edu', 'testpass5');

INSERT INTO taskpreset(taskname, presetid, tasktag, username) VALUES ('Make Dinner', '021a7a21-e6ce-449b-b95d-f4bb2cb5b4a7', 'cooking', 'collin');

INSERT INTO taskscheduled(starttime, endtime, complete, presetid) VALUES ('2021-11-03T02:44:18Z', '2021-11-03T08:44:18Z', 'false', '021a7a21-e6ce-449b-b95d-f4bb2cb5b4a7');

