export const querySelector = selector({
	key: 'querySelector',
	get: ({ get }) => {
		const inputQueries = get(inputQueryState)
		return combineQueries(inputQueries)
	},
})