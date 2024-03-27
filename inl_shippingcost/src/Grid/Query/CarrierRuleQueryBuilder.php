<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */

declare(strict_types=1);

namespace Module\Inl_shippingcost\Grid\Query;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use PrestaShop\PrestaShop\Adapter\Configuration;
use PrestaShop\PrestaShop\Core\Grid\Query\AbstractDoctrineQueryBuilder;
use PrestaShop\PrestaShop\Core\Grid\Query\DoctrineSearchCriteriaApplicatorInterface;
use PrestaShop\PrestaShop\Core\Grid\Query\Filter\DoctrineFilterApplicatorInterface;
use PrestaShop\PrestaShop\Core\Grid\Query\Filter\SqlFilters;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;

/**
 * Defines all required sql statements to render products list.
 */
class CarrierRuleQueryBuilder extends AbstractDoctrineQueryBuilder
{
    /**
     * @var DoctrineSearchCriteriaApplicatorInterface
     */
    private $searchCriteriaApplicator;

    /**
     * @var int
     */
    private $contextLanguageId;

    /**
     * @var int
     */
    private $contextShopId;

    /**
     * @var bool
     */
    private $isStockSharingBetweenShopGroupEnabled;

    /**
     * @var int
     */
    private $contextShopGroupId;

    /**
     * @var DoctrineFilterApplicatorInterface
     */
    private $filterApplicator;

    /**
     * @var Configuration
     */
    private $configuration;

    public function __construct(
        Connection $connection,
        string $dbPrefix,
        DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator,
        int $contextLanguageId,
        int $contextShopId,
        int $contextShopGroupId,
        bool $isStockSharingBetweenShopGroupEnabled,
        DoctrineFilterApplicatorInterface $filterApplicator,
        Configuration $configuration
    ) {
        parent::__construct($connection, $dbPrefix);
        $this->searchCriteriaApplicator = $searchCriteriaApplicator;
        $this->contextLanguageId = $contextLanguageId;
        $this->contextShopId = $contextShopId;
        $this->isStockSharingBetweenShopGroupEnabled = $isStockSharingBetweenShopGroupEnabled;
        $this->contextShopGroupId = $contextShopGroupId;
        $this->filterApplicator = $filterApplicator;
        $this->configuration = $configuration;
    }

    /**
     * {@inheritdoc}
     */
    public function getSearchQueryBuilder(SearchCriteriaInterface $searchCriteria): QueryBuilder
    {
        $qb = $this->getQueryBuilder($searchCriteria->getFilters());
        $qb
            ->select('cr.`id_rule`, c.`name` AS id_carrier, cr.`id_reference`, cl.`name` AS id_country, cr.`price`, cr.`price_max`')
            // ->addSelect('ps.`price` AS `price_tax_excluded`, ps.`active`')
            // ->addSelect('pl.`name`, pl.`link_rewrite`')
            // ->addSelect('cl.`name` AS `category`')
            // ->addSelect('img_shop.`id_image`')
            // ->addSelect('cl.`name`')
        ;
		
		// $qb->leftJoin(
            // '`' . pSQL(_DB_PREFIX_) . 'country_lang`',
            // 'cl',
            // 'cr.`id_country` = cl.`id_country`'
        // );

        // if ($this->configuration->getBoolean('PS_STOCK_MANAGEMENT')) {
            // $qb->addSelect('sa.`quantity`');
        // }

        $this->searchCriteriaApplicator
            ->applyPagination($searchCriteria, $qb)
            ->applySorting($searchCriteria, $qb)
        ;

        return $qb;
    }

    /**
     * {@inheritdoc}
     */
    public function getCountQueryBuilder(SearchCriteriaInterface $searchCriteria): QueryBuilder
    {
        $qb = $this->getQueryBuilder($searchCriteria->getFilters());
        $qb->select('COUNT(cr.`id_rule`)');

        return $qb;
    }

    /**
     * Gets query builder.
     *
     * @param array $filterValues
     *
     * @return QueryBuilder
     */
    private function getQueryBuilder(array $filterValues): QueryBuilder
    {
        $qb = $this->connection
            ->createQueryBuilder()
            ->from($this->dbPrefix . 'carrier_rule', 'cr')
            // ->innerJoin(
                // 'p',
                // $this->dbPrefix . 'product_shop',
                // 'ps',
                // 'ps.`id_product` = p.`id_product` AND ps.`id_shop` = :id_shop'
            // )
            ->leftJoin(
                'cr',
                $this->dbPrefix . 'country_lang',
                'cl',
                'cl.`id_country` = cr.`id_country` AND cl.`id_lang` = :id_lang'
            )
			->leftJoin(
                'cr',
                $this->dbPrefix . 'carrier',
                'c',
                'c.`id_carrier` = cr.`id_carrier`'
            )
            // ->leftJoin(
                // 'ps',
                // $this->dbPrefix . 'category_lang',
                // 'cl',
                // 'cl.`id_category` = ps.`id_category_default` AND cl.`id_lang` = :id_lang AND cl.`id_shop` = :id_shop'
            // )
            // ->leftJoin(
                // 'ps',
                // $this->dbPrefix . 'image_shop',
                // 'img_shop',
                // 'img_shop.`id_product` = ps.`id_product` AND img_shop.`cover` = 1 AND img_shop.`id_shop` = :id_shop'
            // )
            // ->andWhere('p.`state`=1')
        ;

        // $isStockManagementEnabled = $this->configuration->getBoolean('PS_STOCK_MANAGEMENT');

        // if ($isStockManagementEnabled) {
            // $stockOnCondition =
                // 'sa.`id_product` = p.`id_product`
                    // AND sa.`id_product_attribute` = 0
                // ';

            // if ($this->isStockSharingBetweenShopGroupEnabled) {
                // $stockOnCondition .= '
                     // AND sa.`id_shop` = 0 AND sa.`id_shop_group` = :id_shop_group
                // ';
            // } else {
                // $stockOnCondition .= '
                     // AND sa.`id_shop` = :id_shop AND sa.`id_shop_group` = 0
                // ';
            // }

            // $qb->leftJoin(
                // 'p',
                // $this->dbPrefix . 'stock_available',
                // 'sa',
                // $stockOnCondition
            // );

            // $qb->setParameter('id_shop_group', $this->contextShopGroupId);
        // }

        $sqlFilters = new SqlFilters();
        $sqlFilters
            ->addFilter(
                'id_rule',
                'cr.`id_rule`',
                // SqlFilters::MIN_MAX
            )
            ->addFilter(
                'id_carrier',
                'cr.`id_carrier`',
                // SqlFilters::MIN_MAX
            )
			->addFilter(
                'id_reference',
                'cr.`id_reference`',
                // SqlFilters::MIN_MAX
            )
			->addFilter(
                'id_country',
                'cr.`id_country`',
                // SqlFilters::MIN_MAX
            )
			->addFilter(
                'price',
                'cr.`price`',
                // SqlFilters::MIN_MAX
            )
			->addFilter(
                'price_max',
                'cr.`price_max`',
                // SqlFilters::MIN_MAX
            )
        ;

        // if ($isStockManagementEnabled) {
            // $sqlFilters
                // ->addFilter(
                    // 'quantity',
                    // 'sa.`quantity`',
                    // // SqlFilters::MIN_MAX
                // )
            // ;
        // }

        $this->filterApplicator->apply($qb, $sqlFilters, $filterValues);

        // $qb->setParameter('id_shop', $this->contextShopId);
        $qb->setParameter('id_lang', $this->contextLanguageId);

        foreach ($filterValues as $filterName => $filter) {
            if ('id_carrier' === $filterName) {
                $qb->andWhere('cr.`id_carrier` = :id_carrier');
                $qb->setParameter('id_carrier', $filter);

                continue;
            }

            if ('id_reference' === $filterName) {
                $qb->andWhere('cr.`id_reference` = :id_reference');
                $qb->setParameter('id_reference', $filter);

                continue;
            }

            if ('id_country' === $filterName) {
                $qb->andWhere('cr.`id_country` = :id_country');
                $qb->setParameter('id_country', $filter);

                continue;
            }

            if ('price' === $filterName) {
                $qb->andWhere('cr.`price` = :price');
                $qb->setParameter('price', '%' . $filter . '%');

                continue;
            }
			
			if ('price_max' === $filterName) {
                $qb->andWhere('cr.`price_max` = :price_max');
                $qb->setParameter('price_max', '%' . $filter . '%');

                continue;
            }
        }

        return $qb;
    }
}
