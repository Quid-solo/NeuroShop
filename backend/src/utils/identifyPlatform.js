export default function identifyPlatform(url){
    const domain = getDomain(url);
    if(!domain) return 'Invalid URL';

    else if (domain.includes('amazon')) return 'amazon';
    else if (domain.includes('flipkart')) return 'flipkart';
    else if (domain.includes('ebay')) return 'eBay';
    else if (domain.includes('myntra')) return 'myntra';
    else if (domain.includes('ajio')) return 'ajio';
    else if (domain.includes('snapdeal')) return 'snapdeal';
    return 'Unknown Platform';
}

function getDomain(url){
    try {
        const parsed = new URL(url);
        return parsed.hostname;
    } catch (err) {
        return null;
    }
}