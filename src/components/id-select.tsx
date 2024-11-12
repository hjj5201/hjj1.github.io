//用来将服务器返回的类型和option类型相同
import { Select } from "antd";
import React from "react";
import { Raw } from "types";

//需求，用户还行使用别的Select的别的属性 我们还需要再 IdSelectProps去添加吗
//用这个可以直接将select所有属性全部都扒下来
type SelectProps = React.ComponentProps<typeof Select >

//继承SelectProps 删掉SelectProps的重叠属性防止冲突报错
interface IdSelectProps extends Omit<SelectProps, 'value'|'onChange'|'options' > {
    value?: Raw | null | undefined
    onChange?:(value?:number) => void
    // 作为默认值作为空值存在
    defaultOptionName?:string
    options?:{ name: string, id: number}[]
}
/**
 * value可以传入多个类型的值
 * onChange 只会回调 number | undefine 类型
 * inNaN就是检验value类型是否是能转换成数字型的类型
 * 当 inNaN(Number(value))为true，代表选择默认类型
 * 当选择默认类型时，onchange会回调undefin
 * @param props 
 */
export const IdSelect = (props:IdSelectProps) =>{
    // 将其他的所有props都用...restProps来代替
    const {value,onChange,defaultOptionName,options,...restProps} = props
    // 当toNumber(value)不为0时就代表用户选择了有效的项，选择默认项就undifind
    return <Select 
    value ={toNumber(value)} 
    onChange={value => onChange?.(toNumber(value) || undefined)}
    {...restProps}
    >
        {
            // 因为 value ={toNumber(value)}  会把所有没有意义的值转换成0，然后都会匹配到默认的选项上
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}

const toNumber = (value:unknown) => isNaN(Number(value)) ? 0 : Number(value)