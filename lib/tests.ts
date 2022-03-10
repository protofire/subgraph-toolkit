import { Address, Bytes, BigInt, ethereum, TypedMap } from "@graphprotocol/graph-ts"
import { newMockEvent, newMockCall, assert, log, createMockedFunction } from "matchstick-as"

export namespace tests {

	export namespace logs {
		export namespace global {
			export function started(funcName: string, id: string): void {
				log.info(
					"\n_____\n\nfunc={} :: testing entity w/ id={}\n_____\n",
					[funcName, id]
				)
			}

			export function success(funcName: string, id: string): void {
				log.success(
					"\nfunc={} :: succesfully tested w/ id={}\n",
					[funcName, id]
				)
			}

			export function error(funcName: string, detail: string): void {
				log.error(
					"\nfunc={} :: ={}\n",
					[funcName, detail]
				)
			}

			export function warn(funcName: string, detail: string): void {
				log.warning(
					"\nfunc={} :: ={}\n",
					[funcName, detail]
				)
			}
		}

		export namespace internal {
			export function testing(
				funcName: string, expected: string, actual: string
			): void {
				log.debug(
					"\n · func={} ::\ntesting expected={}\nactual={}\n",
					[funcName, expected, actual]
				)
			}
		}
	}

	export namespace helpers {

		export namespace asserts {

			export function assertMany(
				entityName: string,
				entityId: string,
				fields: TypedMap<string, string>
			): void {
				for (let index = 0; index < fields.entries.length; index++) {
					let entry = fields.entries[index];
					assert.fieldEquals(entityName, entityId, entry.key, entry.value)
				}
			}

			export function assertEqual<T>(
				expected: T, actual: T, pipe: (e: T) => ethereum.Value
			): void {
				assert.equals(
					pipe(expected),
					pipe(actual)
				)
			}

			export function assertBytes(
				expected: Bytes, actual: Bytes
			): void {
				logs.internal.testing(
					"assertBytes", expected.toHexString(), actual.toHexString()
				)
				assertEqual<Bytes>(
					expected,
					actual,
					ethereum.Value.fromBytes
				)
			}

			export function assertAddress(
				expected: Address, actual: Address
			): void {
				logs.internal.testing(
					"assertAddress", expected.toHexString(), actual.toHexString()
				)
				assertEqual<Address>(
					expected,
					actual,
					ethereum.Value.fromAddress
				)
			}

			export function assertBigInt(
				expected: BigInt, actual: BigInt
			): void {
				logs.internal.testing(
					"assertBigInt", expected.toString(), actual.toString()
				)
				assertEqual(
					expected,
					actual,
					ethereum.Value.fromUnsignedBigInt
				)
			}

			export function assertString(
				expected: string, actual: string
			): void {
				logs.internal.testing(
					"assertString", expected, actual
				)
				assertEqual(
					expected,
					actual,
					ethereum.Value.fromString
				)
			}

			export function assertStringArray(
				expected: string[], actual: string[]
			): void {
				logs.internal.testing(
					"assertStringArray", expected.toString(), actual.toString()
				)
				assertEqual(
					expected,
					actual,
					ethereum.Value.fromStringArray
				)
			}

		} export namespace events {
			export function getNewEvent(params: ethereum.EventParam[]): ethereum.Event {
				let event = newMockEvent()
				event.parameters = new Array()
				for (let index = 0; index < params.length; index++) {
					event.parameters.push(params[index])
				}
				return event
			}
		}

		export namespace calls {
			export function getNewCall(inputs: ethereum.EventParam[]): ethereum.Call {
				let call = newMockCall()
				call.inputValues = new Array()
				for (let index = 0; index < inputs.length; index++) {
					call.inputValues.push(inputs[index])
				}
				return call
			}
		}

		export namespace contractCalls {
			export function mockFunction(
				contractAddress: Address,
				functionName: string,
				functionSignature: string,
				args: ethereum.Value[],
				returnValues: ethereum.Value[]
			): void {
				createMockedFunction(contractAddress, functionName, functionSignature)
					.withArgs(args)
					.returns(returnValues)
			}
		}
		export namespace params {

			function getNewParam(name: string, value: ethereum.Value): ethereum.EventParam {
				return new ethereum.EventParam(name, value)
			}

			export function getI32(name: string, value: i32): ethereum.EventParam {
				return getNewParam(name, ethereum.Value.fromI32(value))
			}

			export function getString(name: string, value: string): ethereum.EventParam {
				return getNewParam(name, ethereum.Value.fromString(value))
			}

			export function getBytes(name: string, value: Bytes): ethereum.EventParam {
				return getNewParam(name, ethereum.Value.fromBytes(value))
			}

			export function getBoolean(name: string, value: boolean): ethereum.EventParam {
				return getNewParam(name, ethereumValue.getFromBoolean(value))
			}

			export function getBigInt(name: string, value: BigInt): ethereum.EventParam {
				return getNewParam(name, ethereum.Value.fromUnsignedBigInt(value))
			}

			export function getAddress(name: string, value: Address): ethereum.EventParam {
				return getNewParam(name, ethereum.Value.fromAddress(value))
			}

		}

		export namespace ethereumValue {
			export function getFromBoolean(value: boolean): ethereum.Value {
				return ethereum.Value.fromBoolean(value)
			}

			export function getFromI32(value: i32): ethereum.Value {
				return ethereum.Value.fromI32(value)
			}

			export function getFromBigInt(value: BigInt): ethereum.Value {
				return ethereum.Value.fromUnsignedBigInt(value)
			}

		}
	}
}