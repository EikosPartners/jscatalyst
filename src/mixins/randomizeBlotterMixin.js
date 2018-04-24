
const giantTableMockPromise = import('@/assets/mocks/giantTableMock.json');

export const randomizeBlotterMixin = {
	methods: {
		mock10k: async function() {
			const giantTableMock = await giantTableMockPromise
	        let sliceA = giantTableMock.slice(0, 2000)
	        let sliceB = giantTableMock.slice(2000, 4000)
	        let sliceC = giantTableMock.slice(4000, 6000)
	        let sliceD = giantTableMock.slice(6000, 8000)
	        let sliceE = giantTableMock.slice(8000, 10000)

	        let slices = [sliceA, sliceB, sliceC, sliceD, sliceE]
	        let newData = []

	        while (slices.length > 0) {
	          let randomNumber = Math.floor(Math.random() * slices.length)
	          let temp = slices.splice(randomNumber, 1)[0]
	          newData = newData.concat(temp)
	        }

	        console.log('10k data')
	        return newData
		},
		mock25k: async function(){
			let newData = await this.mock10k()
			newData = newData.concat(newData)
			newData = newData.concat(newData.slice(0, 5000))

	        console.log('25k data')
			return newData
		},
		mock50k: async function(){
			let newData = await this.mock10k()
	        let newestData = []

	       	for (var i = 0; i < 5; i++) {
	       		newestData = newestData.concat(newData)
	       	}

	        console.log('50k data')
	        return newestData
		},
		mock100k: async function(){
			let newData = await this.mock10k()
	        let newestData = []

	       	for (var i = 0; i < 10; i++) {
	       		newestData = newestData.concat(newData)
	       	}

	        console.log('100k data')
	        return newestData
		},
		mock250k: async function(){
			let newData = await this.mock100k()
			let halfData = await this.mock50k()
	        let newestData = newData.concat(halfData.concat(newData))
	        console.log('250k data')
	        return newestData
		},
		mock500k: async function(){
			let newData = await this.mock100k()
	        let newestData = []

	       	for (var i = 0; i < 5; i++) {
	       		newestData = newestData.concat(newData)
	       	}

	        console.log('500k data')
	        return newestData
		}

	}
}

export default randomizeBlotterMixin;
