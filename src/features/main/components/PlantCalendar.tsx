import dayjs from 'dayjs'
import React, { useCallback, useEffect, useState } from 'react'
import {
  CalendarDot,
  CalendarList,
  MultiDotMarking,
} from 'react-native-calendars'
import { ActionSheet, ButtonProps, Colors, Text } from 'react-native-ui-lib'
import {
  useAddWatering,
  useDeleteWatering,
  useWatering,
} from 'features/core/api/plantActions'
import { PlantsType } from 'features/core/api/types'
import { TABLES } from 'features/core/supabase/constants'
import { screenWidth } from 'features/core/utils/rnUtils'

type MarkedDateType = Record<string, MultiDotMarking>
interface IProps {
  plantId: PlantsType['id']
}

const water = {
  color: Colors.blue10,
  selectedDotColor: Colors.blue10,
}

interface ISelectedDots {
  date: string
  dots: CalendarDot[]
}

const PlantCalendar = ({ plantId }: IProps) => {
  const [markedDates, setMarkedDates] = useState<MarkedDateType>()
  const [showActionSheet, setShowActionSheet] = useState(false)
  const [selectedDots, setSelectedDots] = useState<ISelectedDots>()

  const { data: watering } = useWatering(plantId)
  const { mutate: waterPlant } = useAddWatering()
  const { mutate: deleteWateringRecord } = useDeleteWatering()

  useEffect(() => {
    if (!watering) {
      return
    }

    const markedDatesObject: MarkedDateType = {}
    const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD')
    for (const item of watering ?? []) {
      markedDatesObject[formatDate(item.watering_date)] = {
        dots: [{ ...water, key: `${TABLES.WATERING}-${item.id}` }],
      }
    }
    setMarkedDates(markedDatesObject)
  }, [watering])

  const getActionSheetOptions = useCallback(
    (records: ISelectedDots | undefined) => {
      const options: ButtonProps[] = []
      if (!records) {
        return options
      }

      const { dots, date } = records
      const waterRecord = dots.find((dot) => dot.key.includes(TABLES.WATERING))
      options.push(
        waterRecord
          ? {
              label: 'Delete watering record',
              onPress: () =>
                void deleteWateringRecord(
                  Number(waterRecord.key.split('-')[1])
                ),
            }
          : {
              label: 'Add watering record',
              onPress: () =>
                void waterPlant({
                  id: plantId,
                  date: dayjs(date).toISOString(),
                }),
            }
      )
      return options
    },
    [deleteWateringRecord, plantId, waterPlant]
  )

  return (
    <>
      <Text text70BO marginL-20>
        Calendar
      </Text>
      <CalendarList
        horizontal
        pagingEnabled
        markingType="multi-dot"
        calendarWidth={screenWidth}
        markedDates={markedDates ?? {}}
        onDayPress={(item) => {
          setShowActionSheet(true)
          setSelectedDots({
            date: item.dateString,
            dots: markedDates?.[item.dateString]?.dots ?? [],
          })
        }}
      />
      <ActionSheet
        title={selectedDots?.date}
        useNativeIOS={false}
        options={getActionSheetOptions(selectedDots)}
        visible={showActionSheet}
        onDismiss={() => setShowActionSheet(false)}
        containerStyle={{ paddingBottom: 20 }}
      />
    </>
  )
}

export default PlantCalendar
