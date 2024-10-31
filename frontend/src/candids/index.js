import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as BitcoinCustomInterfaceFactory,
} from "./BitcoinCustoms.did";
import {
  idlFactory as EvmRouteInterfaceFactory,
} from "./EvmRoute.did";

export const createActor = (
  canisterId,
  interfaceFactory,
) => {
  const agent = HttpAgent.createSync({
    host: "https://icp0.io/",
  });
  return Actor.createActor(interfaceFactory, {
    canisterId,
    agent,
  });
};

const BITLAYER_CANISTER = "he2gn-7qaaa-aaaar-qagaq-cai"
const BITCOIN_CUSTOMS_CANISTER = "7rvjr-3qaaa-aaaar-qaeyq-cai"

export const bitlayerRoute = createActor(BITLAYER_CANISTER, EvmRouteInterfaceFactory);
export const bitcoinCustoms = createActor(BITCOIN_CUSTOMS_CANISTER, BitcoinCustomInterfaceFactory);