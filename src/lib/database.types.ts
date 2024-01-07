export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			completedAt: {
				Row: {
					completedAt: string | null;
					date: string;
					todoId: number;
					userId: string;
				};
				Insert: {
					completedAt?: string | null;
					date?: string;
					todoId: number;
					userId: string;
				};
				Update: {
					completedAt?: string | null;
					date?: string;
					todoId?: number;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'completedAt_todoId_fkey';
						columns: ['todoId'];
						isOneToOne: false;
						referencedRelation: 'todo';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'completedAt_todoId_fkey';
						columns: ['todoId'];
						isOneToOne: false;
						referencedRelation: 'todoWithCompletedAt';
						referencedColumns: ['todoId'];
					},
					{
						foreignKeyName: 'completedAt_userId_fkey';
						columns: ['userId'];
						isOneToOne: false;
						referencedRelation: 'randomUsers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'completedAt_userId_fkey';
						columns: ['userId'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			nickname: {
				Row: {
					nickname: string;
					userId: string;
				};
				Insert: {
					nickname?: string;
					userId: string;
				};
				Update: {
					nickname?: string;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'nickname_userId_fkey';
						columns: ['userId'];
						isOneToOne: true;
						referencedRelation: 'randomUsers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'nickname_userId_fkey';
						columns: ['userId'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			todo: {
				Row: {
					id: number;
					text: string;
					userId: string;
				};
				Insert: {
					id?: number;
					text?: string;
					userId: string;
				};
				Update: {
					id?: number;
					text?: string;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'todo_userId_fkey';
						columns: ['userId'];
						isOneToOne: false;
						referencedRelation: 'randomUsers';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'todo_userId_fkey';
						columns: ['userId'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			randomUsers: {
				Row: {
					id: string | null;
				};
				Insert: {
					id?: string | null;
				};
				Update: {
					id?: string | null;
				};
				Relationships: [];
			};
			todoWithCompletedAt: {
				Row: {
					completedAt: string | null;
					date: string;
					text: string;
					todoId: number;
					userId: string;
				};
				Relationships: [
					{
						foreignKeyName: 'todo_userId_fkey';
						columns: ['userId'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'todo_userId_fkey';
						columns: ['userId'];
						isOneToOne: false;
						referencedRelation: 'randomUsers';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
		? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
		? Database['public']['Enums'][PublicEnumNameOrOptions]
		: never;
