import React, { useState, useMemo, useEffect } from 'react'
import { Input, Select, YStack, XStack, styled, YGroup, Text, Stack, Spinner } from 'tamagui'
import { Check, ChevronDown, Search } from '@tamagui/lucide-icons'

const SearchInput = styled(Input, {
  width: 210,
  paddingRight: 30,
  paddingLeft: 40,
  backgroundColor: '#F8FAFC',
})

const InputIconAfter = styled(Stack, {
  position: 'absolute',
  right: 10,
  top: '50%',
  transform: 'translateY(-50%)',

  zIndex: 10,
})

const InputIconBefore = styled(XStack, {
  position: 'absolute',
  left: 10,
  top: '50%',
  transform: 'translateY(-50%)',
  alignItems: 'center',
  gap : 4,
  zIndex: 10,
})

const SelectGroup = styled(YGroup, {
  backgroundColor: 'white',
  borderRadius: '$4',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  zIndex: 10,
  top: '105%',
  width: '100%',
})

const SelectItem = styled(XStack, {
  gap: 8,
  backgroundColor: 'white',
  cursor: 'pointer',
  hoverStyle: {
    backgroundColor: '#F1F5F9',
  },
})

export const SearchSelect = ({
  options = [{ label: "Erreur pas d'options", value: "erreurpasd'options" }],
  onSelect,
  selectedOption = { label: "Erreur pas d'options", value: "erreurpasd'options" },
  loading = true
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const [displayedOptions, setDisplayedOptions] = useState(options)

  useEffect(() => {
    if (isFocused) {
      setDisplayedOptions(options)
    }
  }, [isFocused, options])

  useEffect(() => {
    if (selectedOption) {
      setSearchValue(selectedOption.label)
    }
  }, [selectedOption])

  useEffect(() => {
    if (searchValue === '') {
      setDisplayedOptions(options)
    } else {
      setDisplayedOptions(
        options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
      )
    }
  }, [searchValue])



  return (
    <YStack gap="$4">
      <SearchInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        placeholder="Choix de la boutique"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <InputIconAfter>
        <ChevronDown size={'$1'} />
      </InputIconAfter>
      <InputIconBefore>
        <Search size={'$1'} />
        {/* <Text>:</Text> */}
      </InputIconBefore>


      {isFocused && (
        <SelectGroup>
          {loading && <YGroup.Item> <SelectItem alignItems='center' justifyContent='center'  paddingHorizontal="$2"
                paddingVertical="$3"><Spinner color='black'></Spinner></SelectItem></YGroup.Item>}
          {!loading && displayedOptions.map((option) => (
            <YGroup.Item key={option.value}>
              <SelectItem
                paddingHorizontal="$2"
                paddingVertical="$3"
                onPress={() => {
                  console.log('option', option)
                  setIsFocused(false)
                  setSearchValue(option.label)
                  onSelect(option)
                }}
              >
                <Text numberOfLines={1}>{option.label}</Text>
                {option.value === selectedOption.value && <Check size={'$1'} />}
              </SelectItem>
            </YGroup.Item>
          ))}
        </SelectGroup>
      )}

      {/* <Select value={selectedValue} onValueChange={setSelectedValue} open={isFocused}>
        <Select.Trigger>
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            {filteredOptions.map((option, index) => (
              <Select.Item index={index} key={option.value} value={option.value}>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select> */}
    </YStack>
  )
}
