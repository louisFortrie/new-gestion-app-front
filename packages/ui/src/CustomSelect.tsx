import React, { useEffect, useMemo, useState } from 'react'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Adapt, Label, Select, Sheet, XStack, YStack, getFontSize } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { FixedSizeList as List } from 'react-window'

interface CustomSelectProps extends SelectProps {
  options: { name: string }[]
  label?: string
  width?: number | string
  onChange?: (value: string) => void
  iconAfter?: React.ReactElement | React.FunctionComponent<{ color?: any; size?: any }> | null
}

export const CustomSelect = React.memo(
  ({ options, label, width, onChange, iconAfter, ...props }: CustomSelectProps) => {
    const [val, setVal] = useState(options[0].name.toLowerCase() || '')

    const handleValueChange = (value: string) => {
      setVal(value)
      onChange && onChange(value)
    }

    const renderedOptions = useMemo(
      () =>
        options.map((item, i) => (
          <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
            <Select.ItemText fontWeight={400}>{item.name}</Select.ItemText>
            <Select.ItemIndicator marginLeft="auto">
              <Check size={16} />
            </Select.ItemIndicator>
          </Select.Item>
        )),
      [options]
    )

    const Row = ({ index, style }) => <div style={style}>{renderedOptions[index]}</div>

    return (
      <Select
        value={val}
        onValueChange={handleValueChange}
        disablePreventBodyScroll
        size="$4"
        {...props}
      >
        <Select.Trigger width={width || 220} iconAfter={iconAfter}>
          <Select.Value placeholder="Something" fontWeight={400} />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native={!!props.native}
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', 'transparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group>
              {label && <Select.Label>{label}</Select.Label>}
              <List
                height={150} // Adjust height as needed
                itemCount={options.length}
                itemSize={35} // Adjust item size as needed
              >
                {Row}
              </List>
            </Select.Group>
            {props.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={'$4'}
                pointerEvents="none"
              >
                <ChevronDown size={getFontSize((props.size as FontSizeTokens) ?? '$true')} />
              </YStack>
            )}
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    )
  }
)

const items = [{ name: 'Année' }, { name: 'Mois' }, { name: 'Semaine' }]
