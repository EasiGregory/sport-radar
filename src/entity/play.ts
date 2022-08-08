import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Play {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  gameId: number;

  @Column({ nullable: true })
  playerId: number;

  @Column({ nullable: true })
  playerName: string;

  @Column({ nullable: true })
  teamId: string;

  @Column({ nullable: true })
  teamName: string;

  @Column({ nullable: true })
  playerAge: string;

  @Column({ nullable: true })
  playerNumber: string;

  @Column({ nullable: true })
  playerPosition: string;

  @Column({ nullable: true })
  assists: number;

  @Column({ nullable: true })
  goals: string;

  @Column({ nullable: true })
  hits: string;

  @Column({ nullable: true })
  points: string;

  @Column({ nullable: true })
  penaltyMinutes: string;

  @Column({ nullable: true })
  event: string;

  @Column({ nullable: true })
  eventId: number;

  @Column({ nullable: true })
  description: string;
}
