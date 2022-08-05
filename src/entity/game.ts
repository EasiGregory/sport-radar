import { Entity, PrimaryColumn, Column } from "typeorm";
import { IContent, IStatus, ITeams, IVenue } from "../type/gameType";

@Entity()
export class Game {
  @PrimaryColumn()
  gamePk: number;

  @Column()
  link: string;

  @Column()
  gameType: string;

  @Column()
  season: string;

  @Column()
  gameDate: string;

  @Column({ type: "jsonb" })
  status: IStatus;

  @Column({ type: "jsonb" })
  teams: ITeams;

  @Column({ type: "jsonb" })
  venue: IVenue;

  @Column({ type: "jsonb" })
  content: IContent;
}
