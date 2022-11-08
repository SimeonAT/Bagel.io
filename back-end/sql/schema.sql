DROP TABLE IF EXISTS foobar;
DROP TABLE IF EXISTS taskscheduled;
DROP TABLE IF EXISTS taskpreset;
DROP TABLE IF EXISTS member;

CREATE TABLE foobar(thetime TIMESTAMP WITH TIME ZONE);

CREATE TABLE member(email VARCHAR(50), username VARCHAR(32) UNIQUE PRIMARY KEY, memberpassword VARCHAR(32));

CREATE TABLE taskpreset(taskname VARCHAR(32), presetid VARCHAR(36) UNIQUE PRIMARY KEY, tasktag VARCHAR(32), username VARCHAR(32), FOREIGN KEY(username) REFERENCES member(username));

CREATE TABLE taskscheduled(starttime VARCHAR(27), scheduledid VARCHAR(36) UNIQUE PRIMARY KEY, endtime VARCHAR(27), complete BOOLEAN, checkedin BOOLEAN, presetid VARCHAR(36), FOREIGN KEY(presetid) REFERENCES taskpreset(presetid));