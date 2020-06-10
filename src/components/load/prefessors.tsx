import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
// @ts-ignore
import Board from 'react-trello';

import { DBUser } from '../../types/auth';
import { Rows } from '../../types/load';
import { DnD, DnDColumnData, DnDCardItem } from '../../types/assign';

export type PerfUser = {
    userId: string;
    subjects: { name: string, load: string }[];
};
type Props = {
    subjects: Rows;
    professors: DBUser[];
    onDataChanged?: (input: PerfUser[]) => void;
}

export default function Professors({ professors, subjects, onDataChanged }: Props) {
    const [board, setBoard] = React.useState<DnD>({
        lanes: [
            {
                id: 'unique',
                title: 'Unassigned',
                cards: subjects.map(subject => ({ id: subject.id, title: subject.subject, label: `${subject.lection_total}/${subject.practice_total}/${subject.lab_total}/${subject.total}` }))
            },
            ...professors.map(professor => ({
                id: professor.uid,
                title: professor.firstname! + professor.lastname!,
                cards: [] as DnDCardItem[],
                label: `0/0/0/0`,
            })),
        ]
    });

    return (
        <Board
            draggable
            onDataChange={(data: DnD) => {
                const users = data.lanes.map(columnData => {
                    if (columnData.id !== 'unique') {
                        const user = {
                            userId: columnData.id, subjects: columnData.cards.map(card => ({ name: card.title, load: card.label }))
                        } as PerfUser;
                        return user;
                    }
                }).filter(item => item !== undefined) as PerfUser[];

                onDataChanged && onDataChanged(users);

            }}
            data={board}
        >
        </Board>
    );
}
function calculateLabels(labels: string[]): string {
    let totalLectures = 0;
    let totalPractice = 0;
    let totalLab = 0;
    let totalFinal = 0;
    labels.forEach(label => {
        const [lecture, practice, lab, total] = label.split('/');
        totalLectures += Number(lecture);
        totalPractice += Number(practice);
        totalLab += Number(lab);
        totalFinal += Number(total);
    })

    return `${totalLectures}/${totalPractice}/${totalLab}/${totalFinal}`;
}