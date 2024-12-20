
useAsync hook 满足了以下几个重要功能：

异步状态管理：

提供了一个清晰的状态管理方式，包括 idle（空闲）、loading（加载中）、error（出错）和 success（成功）状态。这使得在组件中处理异步操作时，能够根据状态渲染不同的 UI。
简化异步请求逻辑：

封装了异步请求的逻辑，使得在组件中只需调用 run 函数即可发起请求，而不需要手动管理 loading 和 error 状态。这样可以减少重复代码，提高可读性。
错误处理：

提供了错误捕获机制，能够通过 setError 更新错误状态，并支持根据配置选择是否抛出错误。这对于显示用户友好的错误消息非常有用。
可配置性：

允许传入初始状态和配置，灵活地适应不同的使用场景。例如，可以决定是否在请求失败时抛出异常。
类型安全：

使用 TypeScript 泛型，使得数据类型更具可预测性，确保在处理异步数据时能够获得正确的类型支持。
清晰的 API：

提供了一组简单易用的 API，包括 isIdle、isLoading、isError、isSuccess 和 run，方便开发者快速了解当前的异步状态并进行相应处理。



useProjects hook 满足了以下功能：

获取项目数据：

通过发送 HTTP 请求来获取项目列表，允许组件从 API 动态加载项目数据。
状态管理：

利用 useAsync 提供的状态管理，处理异步请求的不同状态：
isLoading: 指示数据是否正在加载。
error: 记录请求过程中是否发生错误。
data: 存储成功获取的项目列表。
动态参数处理：

接受可选的查询参数 param，允许开发者根据需求动态过滤项目列表。这使得在 UI 中根据用户输入或选择加载不同的项目数据成为可能。
请求参数清理：

使用 cleanObject 函数清理请求参数，去除值为 null 或 undefined 的属性，确保发送的请求数据有效。这有助于避免因无效参数导致的请求错误。
副作用管理：

利用 useEffect 管理副作用，当 param 变化时自动发起新的请求。这样可以实现对查询条件的响应式更新，确保 UI 始终展示最新的数据。
简化异步逻辑：

封装了异步请求的复杂逻辑，使得组件中的代码更简洁。开发者只需调用 useProjects hook 即可处理数据加载的所有相关状态，而无需重复编写状态管理和错误处理的代码。




使用自定义 Hook 可以显著提升代码的可重用性和可维护性。以下是一些思路和建议，帮助你决定何时以及如何创建和使用自定义 Hook：

1. 识别重复逻辑
如果你发现自己在多个组件中重复使用相同的逻辑，比如数据获取、状态管理、表单处理等，这通常是创建自定义 Hook 的一个好时机。

示例：
如果在多个组件中都有获取用户信息的逻辑，可以将其提取为 useUser Hook。
在多个地方使用相似的表单处理逻辑，可以创建 useForm Hook。
2. 管理复杂的状态
当组件的状态管理变得复杂时，使用自定义 Hook 可以帮助将逻辑分离，使组件更加简洁。

示例：
使用 useAsync 来管理异步请求的状态，可以避免在每个组件中都编写繁琐的 loading、error 和 data 管理逻辑。
3. 共享逻辑
当需要在多个组件之间共享逻辑时，自定义 Hook 是一种优雅的解决方案。它可以通过上下文提供全局状态，或通过参数化的方式在不同组件中重用相同的逻辑。

示例：
使用 useAuth Hook 来管理用户的认证状态，并在多个组件中访问。
4. 提高可读性和可测试性
将复杂的逻辑封装在自定义 Hook 中，可以提高代码的可读性，让组件的逻辑更清晰。同时，这也使得对 Hook 进行单元测试变得更加容易。

5. 根据项目需求创建特定 Hook
根据项目的特定需求，创建专门的 Hook 来处理特定的逻辑。例如，处理 API 调用、表单验证、节流等。

示例：
创建 useDebounce Hook 来处理输入框的防抖逻辑，避免频繁触发事件。
6. 使用社区资源
在开发过程中，查阅社区资源（如 React 官方文档、GitHub、Stack Overflow 等）以获取灵感。许多开发者分享了他们创建的自定义 Hook，查看这些例子可以激发你自己的想法。

总结
使用自定义 Hook 是一种提升代码质量和开发效率的有效方式。关键在于识别重复的逻辑、复杂的状态管理需求以及共享逻辑的场景。通过将这些逻辑提取到自定义 Hook 中，你的代码将更加模块化、可重用，并且易于维护。

如果你在实现自定义 Hook 时遇到具体问题，或者想讨论某个特定场景，随时可以问我！


在react中，渲染阶段出现异常会导致整个React树都会被卸载掉，这样做是react官方认为一个错误的ui比
空白ui害处大。
错误边界：React 错误边界是一个用于捕获和处理 JavaScript 错误的机制，主要用于防止应用崩溃。当一个错误边界组件的子组件树中的任何一个组件抛出错误时，错误边界能够捕获该错误并渲染一个回退 UI，而不是让整个应用崩溃。
事件处理的异常是不会被捕获的

迭代器协议：

一个对象被认为是一个迭代器，当它实现了 next() 方法。
next() 方法返回一个对象，该对象包含两个属性：
value：当前的值。
done：一个布尔值，指示迭代是否结束。
可迭代对象：

一个对象被认为是可迭代的（iterable），当它实现了 Symbol.iterator 方法，返回一个迭代器。
常见的可迭代对象有数组、字符串、映射、集合等。

比如:function createIterator(array) {
    let index = 0;

    return {
        next() {
            if (index < array.length) {
                return { value: array[index++], done: false };
            } else {
                return { done: true };
            }
        }
    };
}

const myArray = [1, 2, 3];
const iterator = createIterator(myArray);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }


Object.fromEntries() 是一个 JavaScript 方法，它将一个键值对的可迭代对象（如数组或 Map）转换为一个对象。这个方法非常方便，特别是在你需要从数组或其他可迭代数据结构构建对象时。
const entries = [['name', 'Alice'], ['age', 25]];
const obj = Object.fromEntries(entries);
console.log(obj); // { name: 'Alice', age: 25 }

使用 useSearchParams() 的基本示例如下：

const [searchParams, setSearchParams] = useSearchParams();

searchParams：这是一个 URLSearchParams 实例，允许你读取查询参数。
setSearchParams：这是一个函数，用于更新查询参数。

可以使用 searchParams.get(key) 方法来获取特定键的值。例如：
const name = searchParams.get("name"); // 获取查询参数 name 的值

要更新查询参数，你可以使用 setSearchParams 函数。例如：
setSearchParams({ name: "Alice", age: "30" });

有时候服务器返回的id是数字型,而option的value拿到是字符串型,导致if判断出错，或者显示出来一些内容

"透传"是指在组件之间传递属性（props）时，不对这些属性进行处理或修改，直接将其传递到子组件的过程。这种方式通常用于确保子组件能够接收到父组件传递的所有必要属性，并且不需要在中间组件中进行额外的逻辑处理。

当你使用 useState 时，可以传递一个函数作为参数，这个函数在组件首次渲染时调用，后续渲染被忽略，并返回初始状态值。这样，只有在需要时才会计算初始状态，而不是每次渲染都计算。

useCallback是特殊类型的useMemo 当依赖里有函数时，多半要用useCallback包裹起来 用于非基本类型的依赖这种要限制  

“状态提升”（lifting state up）是 React 中的一种技术，通常用于多个组件之间共享状态。简而言之，当一个组件的状态需要被多个子组件访问或修改时，React 提供了一种方法将该状态提升到它们的父组件中，并通过 props 传递给子组件。






