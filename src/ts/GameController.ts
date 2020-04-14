import themes from './themes';
import GamePlay from './GamePlay';
import GameStateService from './GameStateService';
import tooltip from './tooltip';
import { calcAvailableStartPosition, calcAvailableAttackCoords } from './utils';
import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import Character from './Character';
import Swordsman from './Swordsman';
import Bowman from './Bowman';
import Undead from './Undead';
import Daemon from './Daemon';
import Vampire from './Vampire';
import Magician from './Magician';
import Team from './Team';

export default class GameController {
    gamePlay: GamePlay;
    stateService: GameStateService;
    charPositions: PositionedCharacter[];
    selectedPoint: null | PositionedCharacter;
    constructor(gamePlay: GamePlay, stateService: GameStateService) {
        this.gamePlay = gamePlay;
        this.stateService = stateService;
        this.charPositions = [];
        this.selectedPoint = null;
    }

    init(): void {
        calcAvailableAttackCoords(this.gamePlay.boardSize, 2, 25, 0);
        this.gamePlay.drawUi(themes.prairie);
        //
        const humanTypeChars: any[] = [Swordsman, Magician, Bowman];
        const humanTeamList: Character[] = [new Bowman(1), new Swordsman(1)];
        const humanTeam: Team = new Team();
        humanTeamList.forEach(char => humanTeam.add(char));
        const humanTeamStartPosition: number[] = calcAvailableStartPosition(0, this.gamePlay.boardSize);
        this.setTeams(humanTeamList, humanTeamStartPosition);
        const AITypeChars: any[] = [Daemon, Undead, Vampire];
        const AITeamList: Character[] = generateTeam(AITypeChars, 1, 2);
        const AITeam: Team = new Team();
        AITeamList.forEach(char => AITeam.add(char));
        const AITeamStartPosition: number[] = calcAvailableStartPosition(6, this.gamePlay.boardSize);
        //
        this.setTeams(AITeamList, AITeamStartPosition);
        // TODO: add event listeners to gamePlay events
        this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
        this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
        this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
        // TODO: load saved stated from stateService
    }

    setTeams(team: Character[], avalibaleStartPosition: number[]): void {
        team.forEach(char => {
            const positionIndex = (): number => {
                return Math.floor(Math.random() * avalibaleStartPosition.length);;
            };
            const coords: number = avalibaleStartPosition[positionIndex()];
            this.charPositions.push(new PositionedCharacter(char, coords));
            this.gamePlay.redrawPositions(this.charPositions);
        });
    }

    isHumanChar(el: PositionedCharacter): boolean {
        const humanTypeChars: any[] = [Swordsman, Magician, Bowman];
        return humanTypeChars.some(type => el.character instanceof type);
    }

    selectPosition(element: PositionedCharacter, index: number): void {
        if (this.selectedPoint) {
            this.gamePlay.deselectCell(this.selectedPoint.position);
        }
        //устанавливаем нового перса выбранным
        this.gamePlay.selectCell(index);
        this.selectedPoint = element;
    }

    move(index: number): void {
        if (this.selectedPoint) {
            this.selectPosition(this.selectedPoint, index);
            this.selectedPoint.position = index;
            this.gamePlay.redrawPositions(this.charPositions);
        }
    }

    onCellClick(index: number): void {
        // TODO: react to click
        for (const el of this.charPositions) {
            const isChar = el.position === index;
            if (isChar && this.isHumanChar(el)) {
                //если кликнули на игрового перса выделяем перса
                this.selectPosition(el, index);
                return;
            }
            //если место клика не игровой персонаж
            if (isChar && !this.isHumanChar(el)) {
                if (!this.selectedPoint) {
                    GamePlay.showError('Это не ваш перс');
                    return;
                }
                //атакуем если кликнули на врага
                console.log('Pif Paf');
                return;
            }
        }
        //если персонаж не в ячейке значит хотим пойти
        this.move(index);
    }

    onCellEnter(index: number): void {
        // TODO: react to mouse enter
        this.charPositions.forEach(el => {
            //если навели на перса
            if (el.position === index) {
                //показываем его хар-ки
                const message = tooltip(el.character);
                this.gamePlay.showCellTooltip(message, index);
                //если при этом персонаж игровой
                if (this.isHumanChar(el)) {
                    //меняем курсор
                    this.gamePlay.setCursor('pointer');
                    return;
                }
                //если перс выбран можно проверить доступные действия
                if (this.selectedPoint) {
                    if (!this.isHumanChar(el)) {
                        this.gamePlay.setCursor('crosshair');
                        this.gamePlay.selectCell(index, 'red');
                        return;
                    }
                }
            }
            // if (this.selectedPoint && !(el.position === index)) {
            //     const preIndex = index;
            //     if (preIndex) {
            //         this.gamePlay.deselectCell(preIndex);
            //     }
            //     this.gamePlay.selectCell(index, 'green');
            // }
        });
        
    }

    onCellLeave(index: number): void {
        // TODO: react to mouse leave
        this.gamePlay.hideCellTooltip(index);
        this.gamePlay.setCursor('auto');
    }
}
