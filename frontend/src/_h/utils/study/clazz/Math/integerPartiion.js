const integerPartition = (number) => {
    const partitionMatrix = Array(number + 1).fill(null).map(() => {
        return Array(number + 1).fill(null);
    });

    for (let numberIndex = 1; numberIndex <= number; numberIndex += 1) {
        partitionMatrix[0][numberIndex] = 0;
    }

    for (let summandIndex = 0; summandIndex <= number; summandIndex += 1) {
        partitionMatrix[summandIndex][0] = 1;
    }

    for (let summandIndex = 1; summandIndex <= number; summandIndex += 1) {
        for (let numberIndex = 1; numberIndex <= number; numberIndex += 1) {
            if (summandIndex > numberIndex) {
                // If summand number is bigger then current number itself then just it won't add
                // any new ways of forming the number. Thus we may just copy the number from row above.
                partitionMatrix[summandIndex][numberIndex] = partitionMatrix[summandIndex - 1][numberIndex];
            } else {
                /*
                 * The number of combinations would equal to number of combinations of forming the same
                 * number but WITHOUT current summand number PLUS number of combinations of forming the
                 * <current number - current summand> number but WITH current summand.
                 *
                 * Example:
                 * Number of ways to form 5 using summands {0, 1, 2} would equal the SUM of:
                 * - number of ways to form 5 using summands {0, 1} (we've excluded summand 2)
                 * - number of ways to form 3 (because 5 - 2 = 3) using summands {0, 1, 2}
                 * (we've included summand 2)
                */
                const combosWithoutSummand = partitionMatrix[summandIndex - 1][numberIndex];
                const combosWithSummand = partitionMatrix[summandIndex][numberIndex - summandIndex];

                partitionMatrix[summandIndex][numberIndex] = combosWithoutSummand + combosWithSummand;
            }
        }
    }

    console.log(partitionMatrix)
}

integerPartition(4)