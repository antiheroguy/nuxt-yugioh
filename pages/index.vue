<template>
  <VaCard>
    <VaCardTitle>Yu-Gi-Oh! Card Search</VaCardTitle>
    <VaCardContent>
      <div class="flex gap-4 py-2">
        <VaInput style="flex: 1" label="Name" placeholder="Name" v-model="name" />
        <VaSelect label="Sort By" v-model="sort" placeholder="Default" clearable :options="sortOptions" />
      </div>
      <VaCollapse v-model="isFilterOpen" header="Advanced Filters" icon="filter_alt">
        <div class="flex gap-4 py-2">
          <VaSelect v-model="cardType" label="Category" placeholder="All" clearable :options="CARD_TYPE" />
          <VaSelect v-model="type" label="Sub-Category" placeholder="All" clearable :options="typeOptions" />
          <VaSelect v-model="race" label="Type" placeholder="All" clearable :options="raceOptions" />
        </div>
        <div class="flex gap-4 py-2">
          <VaSelect label="Attribute" v-model="attribute" placeholder="All" clearable :options="attributeOptions"
            :disabled="!isMonster" />
          <VaInput type="number" label="Attack" v-model="attack" :min="0" :max="5000" placeholder="Attack" clearable
            :disabled="!isMonster" />
          <VaInput type="number" label="Defend" v-model="defend" :min="0" :max="5000" placeholder="Defend" clearable
            :disabled="!isMonster" />
        </div>
        <div class="flex flex-col gap-4 py-2 max-w-64">
          <div class="va-title">Level {{ level ? `(${level})` : null }}</div>
          <VaRating v-model="level" :min="1" :max="13" size="large" :disabled="!isMonster" clearable />
          <div class="va-title">Scale {{ scale ? `(${scale})` : null }}</div>
          <VaRating v-model="scale" :min="0" :max="13" size="large" :disabled="!isMonster" clearable />
          <div class="va-title">Link {{ link ? `(${link})` : null }}</div>
          <VaRating v-model="link" :min="1" :max="8" size="large" :disabled="!isMonster" clearable />
          <div class="va-title">Link Marker {{ linkMarker.length ? `(${linkMarker.join(', ')})` : null }}</div>
          <LinkMarker v-model="linkMarker" :disabled="!isMonster" />
        </div>
        <div class="flex gap-4 py-2">
          <VaSelect v-model="archetype" label="Archetype" placeholder="All" clearable searchable highlight-matched-text
            :options="archetypeOptions" />
          <VaSelect v-model="cardSet" label="Card Set" placeholder="All" clearable searchable highlight-matched-text
            :options="cardSetOptions" />
        </div>
        <div class="flex gap-4 py-2">
          <VaSelect v-model="banList" label="BanList" placeholder="All " clearable :options="banListOptions" />
          <VaSelect v-model="format" label="Format" placeholder="All " clearable :options="formatOptions" />
        </div>
        <div class="flex gap-4 py-2">
          <VaSelect v-model="hasEffect" label="Has Effect ?" placeholder="All" clearable :options="YES_NO_OPTIONS" />
          <VaSelect v-model="staple" label="Is Staple ?" placeholder="All" clearable :options="YES_NO_OPTIONS" />
        </div>
        <div class="flex gap-4 py-2">
          <VaDateInput style="flex: 0" label="Release Date" placeholder="All" v-model="releaseDate" mode="range"
            clearable />
          <VaSelect v-model="dateRegion" label="Date Region" placeholder="All" clearable :options="dateRegionOptions" />
        </div>
      </VaCollapse>
      <div class="flex gap-4 py-2">
        <VaButton preset="primary" @click="search">Search</VaButton>
        <VaButton preset="primary" @click="clearAllFilters">Clear</VaButton>
      </div>
      <VaList>
        <VaListLabel>Results</VaListLabel>
        <VaScrollContainer style="height: 600px" vertical>
          <VaInfiniteScroll :load="loadMore" :disabled="!hasMorePage" :offset="100">
            <VaListItem v-for="(card, index) in cards" :key="index" class="list__item">
              <VaListItemSection class="mr-4" avatar>
                <VaImage fit="contain" class="w-32" :ratio="0.68607594936" :src="card.image" lazy />
              </VaListItemSection>
              <VaListItemSection class="ml-10">
                <VaListItemLabel :lines="100">
                  <h2 class="mb-4 text-xl text-white">{{ card.name }}</h2>
                  <div class="flex mb-4">
                    <template v-for="type, index in card.type">
                      <span class="text-gray-200">{{ type }}</span>
                      <VaDivider vertical v-if="index !== card.type.length - 1" />
                    </template>
                  </div>
                </VaListItemLabel>
                <VaListItemLabel caption :lines="100" v-html="card.desc" />
              </VaListItemSection>
              <VaListItemSection icon v-if="card.data.ygoprodeck_url">
                <VaIcon title="View" name="remove_red_eye" color="white"
                  @click="gotoYGODeck(card.data.ygoprodeck_url)" />
              </VaListItemSection>
            </VaListItem>
          </VaInfiniteScroll>
        </VaScrollContainer>
      </VaList>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import axios from 'axios'
import { MONSTER, RACE, TYPE, CARD_TYPE, FORMAT, SORT, ATTRIBUTE, YES_NO_OPTIONS, BANLIST, DATE_REGION } from '~/constants/options'
import type { Card, CardDetail, Options } from '~/constants/types'

const { init } = useToast()
const toPascalCase = (str: string) => useStartCase(useToLower(str))
const makePascalOptions = (data: string[]) => data.map((item) => ({ text: toPascalCase(item), value: item }))
const makeUpperOptions = (data: string[]) => data.map((item) => ({ text: useUpperCase(item), value: item }))

const limit = 20

const page = ref<number>(1)
const hasMorePage = ref<boolean>(true)
const isFilterOpen = ref<boolean>(false)

const cardType = ref(null)
const name = ref<string | null>(null)
const race = ref<Options | null>(null)
const type = ref<string | null>(null)
const archetype = ref(null)
const attribute = ref<Options | null>(null)
const attack = ref(null)
const defend = ref(null)
const level = ref(undefined)
const link = ref(undefined)
const scale = ref(undefined)
const linkMarker = ref([])
const cardSet = ref(null)
const banList = ref(null)
const sort = ref<Options | null>(null)
const format = ref<Options | null>(null)
const staple = ref<Options | null>(null)
const hasEffect = ref<Options | null>(null)
const releaseDate = ref(null)
const dateRegion = ref(null)

const cards = ref<CardDetail[]>([])
const cardSetOptions = ref<string[]>([])
const archetypeOptions = ref<string[]>([])
const sortOptions = makeUpperOptions(SORT)
const formatOptions = makeUpperOptions(FORMAT)
const attributeOptions = makePascalOptions(ATTRIBUTE)
const banListOptions = makeUpperOptions(BANLIST)
const dateRegionOptions = makeUpperOptions(DATE_REGION)

const isMonster = computed(() => cardType.value === MONSTER)

const raceOptions = computed(() => {
  if (!cardType.value) {
    return []
  }
  return RACE[cardType.value] || []
})

const typeOptions = computed(() => {
  if (!cardType.value) {
    return []
  }
  return TYPE[cardType.value] || []
})

watch(cardType, (value) => {
  clearMonsterFilters()

  if (!value) {
    return
  }

  const typeList: string[] = TYPE[value] || []
  if (typeList.length !== 1) {
    type.value = null
    return
  }

  type.value = typeList[0]
})

const gotoYGODeck = (url: string) => window.open(url, '_blank')

const clearAllFilters = () => {
  name.value = null
  archetype.value = null
  cardSet.value = null
  banList.value = null
  sort.value = null
  format.value = null
  staple.value = null
  hasEffect.value = null
  releaseDate.value = null
  dateRegion.value = null
  page.value = 1
  clearMonsterFilters()
}

const clearMonsterFilters = () => {
  type.value = null
  race.value = null
  attribute.value = null
  attack.value = null
  defend.value = null
  level.value = undefined
  scale.value = undefined
  link.value = undefined
  linkMarker.value = []
}

const loadMore = () => {
  if (!hasMorePage.value) {
    return
  }
  page.value += 1
  return fetchCards()
}

const search = () => {
  page.value = 1
  cards.value = []
  fetchCards()
}

const fetchCardSets = async () => {
  const { data }: { data: Array<{ set_name: string }> } = await axios.get('https://db.ygoprodeck.com/api/v7/cardsets.php')
  cardSetOptions.value = data.map(cardSet => cardSet.set_name)
}

const fetchArchetypes = async () => {
  const { data }: { data: Array<{ archetype_name: string }> } = await axios.get('https://db.ygoprodeck.com/api/v7/archetypes.php')
  archetypeOptions.value = data.map(archetype => archetype.archetype_name)
}

const fetchCards = async () => {
  const params = {
    fname: name.value || null,
    type: type.value || null,
    atk: isNumber(attack.value) ? attack.value : null,
    def: isNumber(defend.value) ? defend.value : null,
    level: level.value || null,
    race: race.value || null,
    attribute: attribute.value?.value || null,
    link: link.value || null,
    linkmarker: linkMarker.value?.join(',') || null,
    scale: scale.value || null,
    cardset: cardSet.value || null,
    archetype: archetype.value || null,
    banlist: banList.value || null,
    sort: sort.value?.value || null,
    format: format.value?.value || null,
    staple: staple.value?.value || null,
    has_effect: hasEffect.value?.value || null,
    startdate: releaseDate.value?.[0] || null,
    enddate: releaseDate.value?.[0] || null,
    dateregion: dateRegion.value || null,
    num: limit,
    offset: limit * (page.value - 1)
  }

  try {
    const { data }: { data: { data: Card[] } } = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', { params })
    const cardData = data.data.map((card) => {
      const type = card.atk !== undefined ?
        [
          card.humanReadableCardType,
          card.attribute,
          card.race,
          card.level ? `Level/Rank: ${card.level}` : null,
          card.scale ? `Scale: ${card.scale}` : null,
          card.linkval ? `Link: ${card.linkval} (${(card.linkmarkers || []).join(', ')})` : null,
          card.atk ? `ATK: ${card.atk}` : null,
          card.def ? `DEF: ${card.def}` : null,
        ]
        : [card.humanReadableCardType]
      return {
        image: card.card_images[0].image_url,
        name: card.name,
        desc: card.desc.replaceAll('\n', '<br>'),
        type: type.filter(item => item !== null),
        data: card
      }
    })

    cards.value = [...cards.value, ...cardData]
    if (cardData.length < limit) {
      hasMorePage.value = false
    }
  } catch (error) {
    hasMorePage.value = false
    console.error(error)
    init({ message: 'Failed to fetch cards', color: 'danger' })
  }
}

onMounted(() => {
  fetchCardSets()
  fetchArchetypes()
})
</script>

<style scoped>
:deep(.va-list-item__inner) {
  padding: 10px 0;
  border-bottom: 1px solid #34495e;
}

:deep(.va-collapse__body-wrapper--bordered) {
  border: none;
}

:deep(.va-collapse__header, .va-collapse__content) {
  padding-left: 0;
  padding-right: 0;
}
</style>