var titles = [ "First Work", "Second Work", "Third Work", "Fourth Work", "Fifth Work" ]
var listTitles = titles.map((title) => 
    <li>{title}<br /></li>
    
);

export default function ContentList() {
    return ( 
        <ul>{listTitles}</ul>
    );
}