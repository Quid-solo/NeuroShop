import Fuse from 'fuse.js';

export default function fuseMatch(titles, title){             //titles = [{title:, index:}, ...]
    const fuse = new Fuse(titles, {
        includeScore: true,
        threshold: 0.75,
        keys: ['title']
    });

    const result = fuse.search(String(title));
    // console.log(result);
    if (result.length === 0) return "not found";

    return result[0];
}