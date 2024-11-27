
import logger from './src/logger.js'
import localStore from './src/localStore.js'
import account from './src/services/account.js'
import content from './src/services/content.js'
import discover from './src/services/discover.js'
import fs from 'fs'


const createObjects = async (profile, objectIds) => {
    const account = await localStore.getContentParam(profile)
    const data = await content.getObjects({ account, objectIds })
    fs.writeFileSync(`objects-${objectIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}

const createArtist = async (profile, artistIds) => {
    const account = await localStore.getContentParam(profile)
    const data = await content.getMusicArtist({ account, artistIds })
    fs.writeFileSync(`artist-${artistIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}

const createMusic = async (profile, concertIds) => {
    const account = await localStore.getContentParam(profile)
    const data = await content.getMusicConcerts({ account, concertIds })
    fs.writeFileSync(`concerts-${concertIds.sort().join('-').substring(0, 200)}.json`, JSON.stringify(data, null, '    '))
}

const stream = {
    "assetId": "32412d344795f33f25c8c8150d8eae1c",
    "audioLocale": "ja-JP",
    "bifs": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_bif.bif?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__",
    "burnedInLocale": "",
    "captions": {},
    "hardSubs": {
        "en-US": {
            "hlang": "en-US",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301070.mp4,4301079.mp4,4301061.mp4,4301043.mp4,4301052.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        },
        "de-DE": {
            "hlang": "de-DE",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301077.mp4,4301086.mp4,4301068.mp4,4301050.mp4,4301059.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        },
        "es-419": {
            "hlang": "es-419",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301071.mp4,4301080.mp4,4301062.mp4,4301044.mp4,4301053.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        },
        "es-ES": {
            "hlang": "es-ES",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301072.mp4,4301081.mp4,4301063.mp4,4301045.mp4,4301054.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        },
        "fr-FR": {
            "hlang": "fr-FR",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301073.mp4,4301082.mp4,4301064.mp4,4301046.mp4,4301055.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        },
        "it-IT": {
            "hlang": "it-IT",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301076.mp4,4301085.mp4,4301067.mp4,4301049.mp4,4301058.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        },
        "pt-BR": {
            "hlang": "pt-BR",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301074.mp4,4301083.mp4,4301065.mp4,4301047.mp4,4301056.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        },
        "ru-RU": {
            "hlang": "ru-RU",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301078.mp4,4301087.mp4,4301069.mp4,4301051.mp4,4301060.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        },
        "ar-SA": {
            "hlang": "ar-SA",
            "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4301075.mp4,4301084.mp4,4301066.mp4,4301048.mp4,4301057.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
            "quality": "adaptive"
        }
    },
    "session": {
        "renewSeconds": 270,
        "noNetworkRetryIntervalSeconds": 30,
        "noNetworkTimeoutSeconds": 370,
        "maximumPauseSeconds": 900,
        "endOfVideoUnloadSeconds": 300,
        "sessionExpirationSeconds": 21600,
        "usesStreamLimits": true
    },
    "subtitles": {
        "en-US": {
            "format": "ass",
            "language": "en-US",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270432.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        },
        "de-DE": {
            "format": "ass",
            "language": "de-DE",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270439.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        },
        "es-419": {
            "format": "ass",
            "language": "es-419",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270433.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        },
        "es-ES": {
            "format": "ass",
            "language": "es-ES",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270434.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        },
        "fr-FR": {
            "format": "ass",
            "language": "fr-FR",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270435.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        },
        "it-IT": {
            "format": "ass",
            "language": "it-IT",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270438.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        },
        "pt-BR": {
            "format": "ass",
            "language": "pt-BR",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270436.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        },
        "ru-RU": {
            "format": "ass",
            "language": "ru-RU",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270440.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        },
        "ar-SA": {
            "format": "ass",
            "language": "ar-SA",
            "url": "https://v.vrv.co/evs3/2a0e92d54c4545af8983cf39f865c339/assets/32412d344795f33f25c8c8150d8eae1c_270437.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly92LnZydi5jby9ldnMzLzJhMGU5MmQ1NGM0NTQ1YWY4OTgzY2YzOWY4NjVjMzM5L2Fzc2V0cy8qIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzA1MTE0MzgyfX19XX0_&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA&Signature=QiVCAEIsw4PkCi7YTusuaLxiDHRwKOc7A33H17K1Bq27sO0aPl3XOhqExvZclGbcNgvkiveAZPuGUl2M6bCyyX57WYLg3O3KL27~hNvU9pfKRdolprmhaUYo2DRDLwNJQ4P4F8~7w9qtTpmqAoeg2oWT8xMze-gC0t~26f1udnxlF4waAsAzIPBGQKn-ZebFKQCM3CR3rzfy~a3zktAK65dw25HnDjE7116dQBchpHR~RZ4HtlOXqr-VT8vl6GE8biVB1ZxzCid3Cqcoxyt5aIYrnHCw8nxJl0TUSSqqpXv8Rmqv1LiBtegTAMUXxKz4JxR4oamlw8pexLRjgdB6qQ__"
        }
    },
    "token": "0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80",
    "url": "https://cr-play-service.prd.crunchyrollsvc.com/v1/manifest/GWDU8KN73/evs3/2a0e92d54c4545af8983cf39f865c339/assets/p/32412d344795f33f25c8c8150d8eae1c_,4300959.mp4,4300960.mp4,4300958.mp4,4300956.mp4,4300957.mp4,.urlset/manifest.mpd?playbackGuid=0d-f9509a77-58d0-4f8b-b045-e9ba8af16a80&accountid=d1650989-cd33-50a3-a195-126b550c4e68",
    "versions": [
        {
            "audio_locale": "ja-JP",
            "guid": "GWDU8KN73",
            "is_premium_only": true,
            "media_guid": "GEMFZG5WQ",
            "original": true,
            "season_guid": "G69PC2WV0",
            "variant": ""
        },
        {
            "audio_locale": "en-US",
            "guid": "G4VUQZV5X",
            "is_premium_only": true,
            "media_guid": "GNJFDG1M7",
            "original": false,
            "season_guid": "G65VCDJ23",
            "variant": ""
        },
        {
            "audio_locale": "de-DE",
            "guid": "G31UX0844",
            "is_premium_only": true,
            "media_guid": "G8MFN4511",
            "original": false,
            "season_guid": "GR75CDWMP",
            "variant": ""
        },
        {
            "audio_locale": "es-419",
            "guid": "GN7UDG1M9",
            "is_premium_only": true,
            "media_guid": "GVMF0J7M5",
            "original": false,
            "season_guid": "G69PC2X7P",
            "variant": ""
        },
        {
            "audio_locale": "pt-BR",
            "guid": "GK9U3QKEJ",
            "is_premium_only": true,
            "media_guid": "G3WFXQ4N1",
            "original": false,
            "season_guid": "G6JQC1M83",
            "variant": ""
        }
    ]
}

const authData = {
    "custom_data": "eyJtZXJjaGFudCI6ImVsbGF0aW9uIiwidXNlcklkIjoiZDE2NTA5ODktY2QzMy01MGEzLWExOTUtMTI2YjU1MGM0ZTY4Iiwic2Vzc2lvbklkIjoiMTcwNTA5Mjg3NTQ3Ni1kMTY1MDk4OS1jZDMzLTUwYTMtYTE5NS0xMjZiNTUwYzRlNjgifQ==",
    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJvcHREYXRhIjoie1wibWVyY2hhbnRcIjpcImVsbGF0aW9uXCIsXCJ1c2VySWRcIjpcImQxNjUwOTg5LWNkMzMtNTBhMy1hMTk1LTEyNmI1NTBjNGU2OFwiLFwic2Vzc2lvbklkXCI6XCIxNzA1MDkyODc1NDc2LWQxNjUwOTg5LWNkMzMtNTBhMy1hMTk1LTEyNmI1NTBjNGU2OFwifSIsImNydCI6Ilt7XCJhY2NvdW50aW5nSWRcIjpcImNydW5jaHlyb2xsXCIsXCJhc3NldElkXCI6XCIzMjQxMmQzNDQ3OTVmMzNmMjVjOGM4MTUwZDhlYWUxY1wiLFwidmFyaWFudElkXCI6XCJhdmtleVwiLFwicmVmXCI6W1wiNmYxMDZmYmItZDRkNi00ZTE5LWFkYzItZGY1YWM0OGE2ZDE3XCJdfV0iLCJpYXQiOjE3MDUwOTI4NzUsImp0aSI6IjU1NTVkZjBiLTg0MjgtNDdlYi1hNjQwLTIzMDg5NmRjOTViYSJ9.TwS6LRSEyjqTRQzo-FbcBViDKziknHoxMYBp4nQgut0giibySTb00cNjHx-9Ud_jI4Uq1_Lvj7nfBzWUWqZ5Kg"
}

const sessionId = '1705092875476-d1650989-cd33-50a3-a195-126b550c4e68'

async function main() {

    logger.setLevel('debug')
    const episodeId = 'GWDU8KN73'
    await localStore.loadFromLocal()
    await localStore.getAuthToken()
    const accountCred = await localStore.getContentParam()
    const home = await discover.getHome({ account: accountCred })
    //    console.log(accountCred)
    //    const stream = await drm.getStream({ account: accountCred, episodeId })
    //    const sessionId = `${new Date().getTime()}-${accountCred.accountId}`
    //    const out = await drm.getAuth({ account: accountCred, assetId: stream.assetId, sessionId })
    //    const out = await drm.getWidevineLicense({ account: accountCred, assetId: stream.assetId, sessionId })
    console.log(JSON.stringify(home, null, '    '))

}

main().catch(e => {
    logger.error(e)
})
