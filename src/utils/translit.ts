const converter = new Map<string, string>([
    ['а', 'a'],
    ['б', 'b'],
    ['в', 'v'],
    ['г', 'g'],
    ['д', 'd'],
    ['е', 'e'],
    ['ё', 'e'],
    ['ж', 'zh'],
    ['з', 'z'],
    ['и', 'i'],
    ['й', 'y'],
    ['к', 'k'],
    ['л', 'l'],
    ['м', 'm'],
    ['н', 'n'],
    ['о', 'o'],
    ['п', 'p'],
    ['р', 'r'],
    ['с', 's'],
    ['т', 't'],
    ['у', 'u'],
    ['ф', 'f'],
    ['х', 'h'],
    ['ц', 'ts'],
    ['ч', 'ch'],
    ['ш', 'sh'],
    ['щ', 'sc'],
    ['ь', 'b'],
    ['ы', 'y'],    
    ['ъ', ''],
    ['э', 'e'],    
    ['ю', 'yu'], 
    ['я', 'ya']
]);


export const translit = (word: string): string => {
    word = word.toLowerCase();

    let answer = '';
    for (let i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
            answer += '-';
        } else {
            answer += converter.get(word[i]);
        }
    }

    return answer;
}