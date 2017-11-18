WITH happy as(
    SELECT m.* 
    FROM media m
    JOIN emotion e ON m.emotion_id = e.emotion_id
    WHERE e.emotion = 'happy'
),
surprised as (
    SELECT m.* 
    FROM media m
    JOIN emotion e ON m.emotion_id = e.emotion_id
    WHERE e.emotion = 'surprised'
),
angry as (
    SELECT m.*
    FROM media m
    JOIN emotion e ON m.emotion_id = e.emotion_id
    WHERE e.emotion = 'angry'
    --AND m.media_id = -1
),
emotion_media as (
    SELECT * 
    FROM happy

    UNION all
    SELECT * FROM surprised

    UNION all
    SELECT * FROM angry
)

SELECT * 
FROM emotion_media
ORDER BY random()
limit 1;