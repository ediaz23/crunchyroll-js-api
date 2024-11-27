
import { expect } from '@jest/globals'

import localStore from '../src/localStore.js'
import testUtils from './testUtils.js'
import review from '../src/services/review.js'


/** @type {import('../src/types').AccountAuth} */
let account = null

beforeEach(async () => {
    await testUtils.init()
    account = await localStore.getContentParam()
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
    for (let i = 1; i <= 5; ++i) {
        expect(res).toHaveProperty(`${i}s`)
        starRating(res[`${i}s`])
    }
    expect(res).toHaveProperty('average')
    expect(res).toHaveProperty('total')
    expect(res).toHaveProperty('rating')
    testUtils.existValue(res.average)
    testUtils.existValue(res.total)
}

const episodeId = 'GWDU8KN73', serieId = 'GR751KNZY'

describe('Review', () => {

    test('addEpisodeRating wrong contentType', async () => {
        await expect(review.addEpisodeRating({
            account,
            contentId: episodeId,
            rating: 'down',
            contentType: 'malo'
        })).rejects.toThrow()
    })

    test('addEpisodeRating wrong rating', async () => {
        await expect(review.addEpisodeRating({
            account,
            contentId: episodeId,
            rating: 'malo'
        })).rejects.toThrow()
    })

    test('addEpisodeRating okey down', async () => {
        return review.addEpisodeRating({
            account,
            contentId: episodeId,
            rating: 'down'
        }).then(res => {
            checkEpisodeRatingResult(res)
            expect(res.rating).toEqual('down')
        })
    })

    test('addEpisodeRating okey up', async () => {
        return review.addEpisodeRating({
            account,
            contentId: episodeId,
            rating: 'up'
        }).then(res => {
            checkEpisodeRatingResult(res)
            expect(res.rating).toEqual('up')
        })
    })

    test('addRating okey', async () => {
        return review.addRating({
            account,
            contentId: serieId,
            rating: '5s',
            contentType: 'series'
        }).then(res => {
            checkRatingResult(res)
            testUtils.existValue(res.rating)
            expect(res.rating).toEqual('5s')
        })
    })

    test('addRating wrong rating', async () => {
        await expect(review.addRating({
            account,
            contentId: serieId,
            rating: 'malo',
            contentType: 'series'
        })).rejects.toThrow()
    })

    test('addRating wrong contentType', async () => {
        await expect(review.addRating({
            account,
            contentId: serieId,
            rating: '5s',
            contentType: 'malo'
        })).rejects.toThrow()
    })

    test('getEpisodeRatings okey', async () => {
        return review.getEpisodeRatings({
            account,
            contentId: episodeId
        }).then(res => {
            checkEpisodeRatingResult(res)
            expect(res).toHaveProperty('rating')
        })
    })

    test('getEpisodeRatings wrong key', async () => {
        return review.getEpisodeRatings({
            account,
            contentId: episodeId + '_1'
        }).then(res => {
            checkEpisodeRatingResult(res)
            expect(res).toHaveProperty('rating')
        })
    })

    test('getRatings okey', async () => {
        return review.getRatings({
            account,
            contentId: serieId,
            contentType: 'series'
        }).then(res => {
            checkRatingResult(res)
        })
    })

    test('getRatings wrong key', async () => {
        return review.getRatings({
            account,
            contentId: serieId + '_1',
            contentType: 'series'
        }).then(res => {
            checkRatingResult(res)
        })
    })

    test('getRatings wrong contentType', async () => {
        await expect(review.getRatings({
            account,
            contentId: serieId,
            contentType: 'malo'
        })).rejects.toThrow()
    })

    test('removeRating okey', async () => {
        return review.removeRating({
            account,
            contentId: episodeId,
            contentType: 'episode'
        })
    })

    test('removeRating valid contentType', async () => {
        await expect(review.removeRating({
            account,
            contentId: serieId,
            contentType: 'series'
        })).rejects.toThrow()
    })

    test('removeRating wrong contentType', async () => {
        await expect(review.removeRating({
            account,
            contentId: serieId,
            contentType: 'malo'
        })).rejects.toThrow()
    })

    test('removeRating wrong key', async () => {
        await expect(review.removeRating({
            account,
            contentId: serieId + '_1',
            contentType: 'series'
        })).rejects.toThrow()
    })
})
