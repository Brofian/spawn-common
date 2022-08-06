<?php

namespace SpawnCommon\Elements;

class EntityTableDefinition extends TableDefinition {

    protected array $columns = [];
    protected string $entityName;

    public function __construct(string $entityName)
    {
        $this->entityName = $entityName;
    }

    public function getEntityName(): string {
        return $this->entityName;
    }

    /**
     * @private
     */
    public function getRows(): array {
        throw new \RuntimeException('Can´t get rows for entity table');
    }

    /**
     * @private
     */
    public function addRow(array $rowData): void {
        throw new \RuntimeException('Can´t set row for entity table');
    }

    /**
     * @private
     */
    public function addRows(array $rows): void {
        throw new \RuntimeException('Can´t set rows for entity table');
    }

}