CREATE TABLE emotion (
        emotion_id serial PRIMARY KEY,
        emotion varchar(150) UNIQUE
);

CREATE TABLE type (
        type_id serial PRIMARY KEY,
        type_name varchar(150) UNIQUE
);

CREATE TABLE media (
        media_id serial PRIMARY KEY,
        type_id int4 REFERENCES type(type_id),
        emotion_id int4 REFERENCES emotion(emotion_id),
        url varchar(200)
);