import { Numerical } from '../src/@interfaces/numerical';
import { test, fc } from '@fast-check/jest';
import { math } from '../src';
import { StringClass } from '../src/@test.classes/classes';

let stringRep: Numerical<string>
describe('math', () => {
  beforeEach(() => {
    stringRep = new StringClass()

  });

  describe('dot', () => {
    it('should calculate the dot product of two number vectors', () => {
      fc.property(
        fc.array(fc.integer()),
        fc.array(fc.integer()),
        (vector1: number[], vector2: number[]) => {
          const expected: number = vector1.reduce((acc, val, index) => acc + val * vector2[index], 0);
          const actual: number = math.dot(vector1, vector2);
          expect(actual).toEqual(expected);
        }
      );
    });

    it('should calculate the dot product of two bigint vectors', () => {
      fc.property(
        fc.array(fc.bigInt()),
        fc.array(fc.bigInt()),
        (vector1: bigint[], vector2: bigint[]) => {
          const expected: bigint = vector1.reduce((acc, val, index) => acc + val * vector2[index], 0n);
          const actual: bigint = math.dot(vector1, vector2);
          expect(actual).toEqual(expected);
        }
      );
    });

    it('should calculate the dot product correctly', () => {
      fc.assert(
        fc.property(fc.array(fc.constantFrom('a', 'x')), fc.array(fc.constantFrom('a', 'x')), (vectorA, vectorB) => {
          const dotProductResult = math.dot(vectorA, vectorB, stringRep);

          let expectedDotProduct = stringRep.zeroValue;
          for (let i = 0; i < vectorA.length; i++) {
            const product = stringRep.multiply(vectorA[i], vectorB[i]);
            expectedDotProduct = stringRep.add(expectedDotProduct, product);
          }

          expect(dotProductResult).toBe(expectedDotProduct);
        })
      );
    });
  });



})

