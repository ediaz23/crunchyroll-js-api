
const localStore = require('../localStore')
const testUtils = require('./testUtils')
const review = require('../services/review')


/** @type {{account: import('../types').AccountAuth}} */
let basicParam = null

beforeEach(async () => {
    await localStore.loadFromLocal()
    const token = await localStore.getAuthToken()
    const locale = await localStore.getLocale()
    const accountId = (await localStore.getToken()).accountId
    basicParam = { account: { token, locale, accountId } }
})

/**
 * @param {import('../types').RatingEpisode} res
 */
function checkEpisodeRatingResult(res) {
    expect(res).toBeDefined()
    expect(res).not.toBeNull()
    expect(res).toHaveProperty('up')
    expect(res).toHaveProperty('down')
    expect(res).toHaveProperty('total')
    expect(res).toHaveProperty('rating')
    expect(res.down).not.toBeNull()
    expect(res.up).not.toBeNull()
    expect(res).toHaveProperty('rating')
    expect(res.down).toHaveProperty('displayed')
    expect(res.down).toHaveProperty('unit')
    expect(res.up).toHaveProperty('displayed')
    expect(res.up).toHaveProperty('unit')
    testUtils.existValue(res.total)
}

/**
 * @param {import('../types').RatingStars} res
 */
function checkRatingResult(res) {
    const starRating = rating => {
        expect(rating).toHaveProperty('displayed')
        expect(rating).toHaveProperty('unit')
        expect(rating).toHaveProperty('percentage')
    }
    expect(res).toBeDefined()
    expect(res).not.toBeNull()
    for (let i=1; i<=5; ++i) {
        expect(res).toHaveProperty(`${i}s`)
        starRating(res[`${i}s`])
    }
    expect(res).toHaveProperty('average')
    expect(res).toHaveProperty('total')
    expect(res).toHaveProperty('rating')
    testUtils.existValue(res.average)
    testUtils.existValue(res.total)
}

const episodeId='GWDU8KN73', serieId='GR751KNZY'

describe('Review', () => {
    test('empty', () => {})

    test('addEpisodeRating wrong contentType', async() => {
        const param = {...basicParam, contentId: episodeId, rating: 'down', contentType: 'malo'}
        await expect(review.addEpisodeRating(param)).rejects.toThrow()
    })

    test('addEpisodeRating wrong rating', async() => {
        const param = {...basicParam, contentId: episodeId, rating: 'malo'}
        await expect(review.addEpisodeRating(param)).rejects.toThrow()
    })

    test('addEpisodeRating okey down', async() => {
        const param = {...basicParam, contentId: episodeId, rating: 'down'}
        return review.addEpisodeRating(param).then(res => {
            checkEpisodeRatingResult(res)
            expect(res.rating).toEqual('down')
        })
    })
    
    test('addEpisodeRating okey up', async() => {
        const param = {...basicParam, contentId: episodeId, rating: 'up'}
        return review.addEpisodeRating(param).then(res => {
            checkEpisodeRatingResult(res)
            expect(res.rating).toEqual('up')
        })
    })
    
    test('addRating okey', async() => {
        const param = {...basicParam, contentId: serieId, rating: '5s', contentType: 'series'}
        return review.addRating(param).then(res => {
            checkRatingResult(res)
            testUtils.existValue(res.rating)
            expect(res.rating).toEqual('5s')
        })
    })
    
    test('addRating wrong rating', async() => {
        const param = {...basicParam, contentId: serieId, rating: 'malo', contentType: 'series'}
        await expect(review.addRating(param)).rejects.toThrow()
    })
    
    test('addRating wrong contentType', async() => {
        const param = {...basicParam, contentId: serieId, rating: '5s', contentType: 'malo'}
        await expect(review.addRating(param)).rejects.toThrow()
    })
    
    test('getEpisodeRatings okey', async() => {
        const param = {...basicParam, contentId: episodeId}
        return review.getEpisodeRatings(param).then(res => {
            checkEpisodeRatingResult(res)
            expect(res).toHaveProperty('rating')
        })
    })
    
    test('getEpisodeRatings wrong key', async() => {
        const param = {...basicParam, contentId: episodeId + '_1'}
        return review.getEpisodeRatings(param).then(res => {
            checkEpisodeRatingResult(res)
            expect(res).toHaveProperty('rating')
        })
    })
    
    test('getRatings okey', async() => {
        const param = {...basicParam, contentId: serieId, contentType: 'series'}
        return review.getRatings(param).then(res => {
            checkRatingResult(res)
        })
    })
    
    test('getRatings wrong key', async() => {
        const param = {...basicParam, contentId: serieId + '_1', contentType: 'series'}
        return review.getRatings(param).then(res => {
            checkRatingResult(res)
        })
    })
    
    test('getRatings wrong contentType', async() => {
        const param = {...basicParam, contentId: serieId, contentType: 'malo'}
        await expect(review.getRatings(param)).rejects.toThrow()
    })

    test('removeRating okey', async() => {
        const param = {...basicParam, contentId: episodeId, contentType: 'episode'}
        return review.removeRating(param)
    })

    test('removeRating valid contentType', async() => {
        const param = {...basicParam, contentId: serieId, contentType: 'series'}
        await expect(review.removeRating(param)).rejects.toThrow()
    })
    
    test('removeRating wrong contentType', async() => {
        const param = {...basicParam, contentId: serieId, contentType: 'malo'}
        await expect(review.removeRating(param)).rejects.toThrow()
    })
    
    test('removeRating wrong key', async() => {
        const param = {...basicParam, contentId: serieId + '_1', contentType: 'series'}
        await expect(review.removeRating(param)).rejects.toThrow()
    })
})