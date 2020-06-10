export type StudentInfo = Pick<Row, 'count_students'> & Pick<Row, 'count_streams'> & Pick<Row, 'count_groups'> & Pick<Row, 'count_subgroups_groups'> & Record<string, number>
export type Row = {
    id: number;
    /**
     * название предмета
     *
     * @type {string}
     */
    subject: string;
    /**
     * Курс
     *
     * @type {number}
     */
    course: number;
    /**
     * Кол-во студентов
     *
     * @type {number}
     */
    count_students: number;
    /**
     * Кол-во потоков
     *
     * @type {number}
     */
    count_streams: number;
    /**
     * Кол-во групп
     *
     * @type {number}
     */
    count_groups: number;
    /**
     * Кол-во подгрупп
     *
     * @type {number}
     */
    count_subgroups_groups: number;
    /**
     * Лекции запланировано
     *
     * @type {number}
     */
    lection_planned: number;
    /**
     * Лекции всего
     *
     * @type {number}
     */
    lection_total: number;
    /**
     * Лабораторных заплировано
     *
     * @type {number}
     */
    lab_planned: number;
    /**
     * Лабораторных всего
     *
     * @type {number}
     */
    lab_total: number;
    /**
     * Практических запланировано
     *
     * @type {number}
     */
    practice_planned: number;
    /**
     * Практических всего
     *
     * @type {number}
     */
    practice_total: number;
    /**
     * модульно-рейтинговая система
     *
     * @type {number}
     */
    raiting: number;
    /**
     * индивидульная работа
     *
     * @type {number}
     */
    personal_work: number;
    /**
     * курсовая
     *
     * @type {number}
     */
    course_work: number;
    /**
     * консультация
     *
     * @type {number}
     */
    advice: number;
    /**
     * рецензирование контрольных работ
     *
     * @type {number}
     */
    peer_view: number;
    /**
     * Экзамены
     *
     * @type {number}
     */
    exams: number;
    /**
     * Зачеты
     *
     * @type {number}
     */
    offsets: number;
    /**
     * учебная практика
     *
     * @type {number}
     */
    practice_study: number;
    /**
     * производственная практика
     *
     * @type {number}
     */
    practice_product: number;
    /**
     * Дипломное проектирование
     *
     * @type {number}
     */
    diploma: number;
    /**
     * ГЭК / ГАК (студенты и маг.)
     *
     * @type {number}
     */
    magistratura: number;
    /**
     * Аспирантура
     *
     * @type {number}
     */
    aspirantura: number;
    budgets: StudentInfo;
    payers: StudentInfo;
    total?: number;
};
export type Rows = Row[];
