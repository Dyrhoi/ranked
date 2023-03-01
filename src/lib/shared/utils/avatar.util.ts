import { thumbs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import type { Player } from '@prisma/client';

export const generateAvatar = (player: Pick<Player, 'name'>) => {
	return createAvatar(thumbs, {
		size: 128,
		seed: player.name,
	}).toDataUriSync();
};
