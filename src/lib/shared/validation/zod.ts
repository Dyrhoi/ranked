import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const CreateGameSchema = zfd.formData({
	teams: z.array(
		z.object({
			playerIds: z.array(zfd.numeric()),
			score: zfd.numeric(),
		})
	),
});

export type CreateGameSchema = z.infer<typeof CreateGameSchema>;
