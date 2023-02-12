let contentList = [ 
    {"id": 0, "title": "First Work"},
    {"id": 1, "title": "Second Work"},
    {"id": 2, "title": "Third Work"},
    {"id": 3, "title": "Fourth Work"},
]

var listTitles = contentList.map((current) => 
    <a href={current.id}><li>{current.title}<br /></li></a>
);

export default function ContentList() {
    return ( 
        <ul>{listTitles}</ul>
    );
}