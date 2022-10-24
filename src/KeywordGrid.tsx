import React from 'react';

interface Props {
    keywords: [{word: string, score: number}]
};

const KeywordGrid = (props: Props) => {
    const { keywords } = props;
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Keyword
                    </th>
                    <th>
                        Score
                    </th>
                </tr>
            </thead>
            <tbody>
                {keywords.map((keyword, index) => {
                    return (
                        <tr key={`kw-${index}`}>
                            <td>{keyword.word}</td>
                            <td>{keyword.score}</td>
                        </tr>
                    )})}
            </tbody>
        </table>
    )
};

export default KeywordGrid;
